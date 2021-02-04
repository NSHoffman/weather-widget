<template>
  <li class="weather-item">

    <!--If Weather Data is available - show information-->
    <section v-if="weather" class="weather-data">
      <h3 class="weather-data__heading">{{ location.name }}</h3>
      <section class="weather-data__temp">
        <img :src="iconLink" :alt="description"> 
        <span class="weather-data__deg">{{ formatTemperature(weather.temp) }}</span>   
      </section>
      <span class="weather-data__desc">{{ description }}</span>
      <section class="weather-data__misc">
        <ul class="weather-data__misc-left">
          <li>
            <font-awesome-icon icon="wind"
              class="weather-data__icon overridden"
            ></font-awesome-icon>
            Wind: <span class="weather-data__value">{{ wind }}</span>
          </li>
          <li>
            <font-awesome-icon icon="tint"
              class="weather-data__icon overridden"
            ></font-awesome-icon>
            Humidity: <span class="weather-data__value">{{ humidity }}</span>
          </li>
          <li>
            <font-awesome-icon icon="weight-hanging"
              class="weather-data__icon overridden"
            ></font-awesome-icon>
            Pressure: <span class="weather-data__value">{{ pressure }}</span>
          </li>
        </ul>
        <ul class="weather-data__misc-right">
          <li>
            <font-awesome-icon icon="eye"
              class="weather-data__icon overridden"
            ></font-awesome-icon>
            Visibility: <span class="weather-data__value">{{ visibility }}</span>
          </li>
          <li>
            <font-awesome-icon icon="sun"
              class="weather-data__icon overridden"
            ></font-awesome-icon>
            UV: <span class="weather-data__value">{{ uvi }}</span>
          </li>
          <li>
            <font-awesome-icon icon="temperature-low"
              class="weather-data__icon overridden"
            ></font-awesome-icon>
            Dew Point: <span class="weather-data__value">{{ dewPoint }}</span>
          </li>
        </ul>
      </section>
    </section>

    <!--If loading is in progress - show skeleton component-->
    <weather-item-skeleton
      v-else-if="isLoading"
    ></weather-item-skeleton>

    <!--If error occurred - show error message-->
    <weather-item-error v-else-if="error">
      <h2 class="weather-item-error__heading">
        Oops!
      </h2>
      <span class="weather-item-error__text">
        {{ error }}
      </span>
    </weather-item-error>
  </li>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import WeatherItemSkeleton from "./WeatherItemSkeleton.vue";
import WeatherItemError from "./WeatherItemError.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faWind, faTemperatureLow, faTint, faEye, faWeightHanging, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { OpenWeatherAPI } from "@/weather-api";
import { WeatherLocation } from "@/weather-api/types";
import { WeatherItemData } from "./types";

library.add(faEye, faSun, faWind, faTint, faTemperatureLow, faWeightHanging);

export default defineComponent({
  components: {
    "font-awesome-icon": FontAwesomeIcon,
    "weather-item-skeleton": WeatherItemSkeleton,
    "weather-item-error": WeatherItemError,
  },

  data(): WeatherItemData {
    return {
      weather: null,
      isLoading: false,
      error: null,
    };
  },

  props: {
    location: {
      type: Object as PropType<WeatherLocation>,
      required: true,
    },
  },

  computed: {
  // no-non-null-assertion rule is disabled as there is no way these members are going to be used with weather object absent
  /* eslint-disable @typescript-eslint/no-non-null-assertion */
    iconLink(): string {    
      return `http://openweathermap.org/img/wn/${this.weather!.icon}@2x.png`;
    },
    description(): string {
      const desc = this.weather!.description;
      const feelsLike = this.formatTemperature(this.weather!.feelsLike);
      return `Feels like ${feelsLike}. ${desc[0].toUpperCase() + desc.slice(1)}. ${this.windString}`;
    },
    dewPoint(): string {
      return this.formatTemperature(this.weather!.dewPoint);
    },
    humidity(): string {
      return `${this.weather!.humidity}%`;
    },
    pressure(): string {
      return `${this.weather!.pressure}hPa`;
    },
    uvi(): number {
      return this.weather!.uvi;
    },
    visibility(): string {
      return `${this.weather!.visibility/1000}km`;
    },
    wind(): string {
      return this.weather!.wind.formatted;
    },
    windString(): string {
      return this.weather!.wind.description;
    },
  /* eslint-enable @typescript-eslint/no-non-null-assertion */
  },

  methods: {
    async fetchWeather() {
      this.isLoading = true;
      const response = await OpenWeatherAPI.getWeatherByCoords(this.location);
      this.isLoading = false;

      if (response) {
        this.error && (this.error = null);
        this.weather = response;
      }
      else {
        this.weather && (this.weather = null);
        this.error = "Couldn't get data from external API :(";
      }
    },

    formatTemperature(temp: number): string {
      temp = Math.round(temp);
      return temp > 0 ? `+${temp}°C` : `${temp}°C`;
    },
  },

  async created() {
    await this.fetchWeather();
  },
})
</script>

<style lang="scss">
@import "../assets/variables";
$content-width: 360px;

.weather-item + .weather-item {
  margin-top: $offset-lg;
}

.weather-data {
  text-align: center;
  border-radius: $border-radius;
  background-color: #fff;
  width: 360px;
  box-shadow: $box-shadow;

  &__heading {
    font-size: 1.25rem;
    padding: $offset-sm $offset-lg;
    background-color: $theme-color;
    color: #FFF;
    border-top-left-radius: $border-radius;
    border-top-right-radius: $border-radius;
  }

  &__temp {
    display: flex;
    padding: 0 $offset-lg;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  &__deg {
    font-size: 2.25rem;
    font-weight: 400;
  }

  &__desc {
    font-weight: 600;
    padding: 0 $offset-lg;
  }

  &__misc {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: $offset-lg;
    padding: 0 $offset-lg $offset-lg;

    &-right, &-left {
      text-align: left;
      font-size: 0.85rem;
    }

    &-left {
      padding-right: $offset-md;
      border-right: 2px solid $theme-color;
    }
    &-right {
      padding-left: $offset-md;
    }
  }

  &__icon.overridden {
    width: 1rem;
  }

  &__value {
    color:$theme-color;
    font-weight: 600;
  }
}

.weather-item-error__heading {
  font-size: 3rem;
  font-weight: 400;
}
.weather-item-error__text {
  font-size: 0.85rem;
}
</style>