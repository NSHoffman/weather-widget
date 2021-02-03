<template>
  <section class="weather-widget">
    <header class="weather-widget__header">
      <h2>{{ title }}</h2>

      <button 
        @click.prevent="toggleSettings"
        class="weather-widget__settings-button"
      >
        <font-awesome-icon v-if="!settingsOpen" 
          icon="cog"
          class="weather-widget__icon"
        ></font-awesome-icon>
        <font-awesome-icon v-else 
          icon="times"
          class="weather-widget__icon"
        ></font-awesome-icon>
      </button>
    </header>

    <weather-settings 
      v-if="settingsOpen"
      :locations="locations"
      @add-location="addLocation"
      @remove-location="removeLocation"
      @update-order="updateStorage"
    ></weather-settings>
    
    <weather-list v-else
      :locations="locations"
    ></weather-list>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCog, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { OpenWeatherAPI } from "@/weather-api";
import { WeatherLocation } from "@/weather-api/types";
import { WeatherWidgetData } from "./types";
import WeatherList from "./WeatherList.vue";
import WeatherSettings from "./WeatherSettings.vue";

library.add(faCog, faTimes);

export default defineComponent({
  components: {
    "weather-list": WeatherList,
    "weather-settings": WeatherSettings,
    "font-awesome-icon": FontAwesomeIcon,
  },

  data(): WeatherWidgetData {
    return {
      locations: [],
      settingsOpen: false,
    };
  },

  computed: {
    title(): string {
      return this.settingsOpen ? "Settings" : "Weather Widget";
    },
  },

  methods: {
    toggleSettings() {
      this.settingsOpen = !this.settingsOpen;
    },
    addLocation(e: WeatherLocation) {
      this.locations = [...this.locations, e];
      this.updateStorage();
    },
    removeLocation(e: WeatherLocation) {
      this.locations = this.locations.filter(l => l.id !== e.id);
      this.updateStorage();
    },
    updateStorage() {
      localStorage.setItem("locations", JSON.stringify(this.locations));
    },
  },
  async created() {
    const locationsCache = localStorage.getItem("locations");
    if (locationsCache) {
      this.locations = JSON.parse(locationsCache);
    }
    else {
      const defaultLocation = await OpenWeatherAPI.getDefaultLocation();
      if (defaultLocation) {
        this.locations = [defaultLocation];
        localStorage.setItem("locations", JSON.stringify([defaultLocation]));
      }
      else {
        this.locations = [];
      }
    }
  }
});
</script>

<style lang="scss">
@import "../assets/variables";
$app-width: 392px;

.weather-widget {
  display: block;
  width: $app-width;
  background-image: linear-gradient(162deg, rgba(249,249,249,1) 0%, rgba(245,245,245,1) 100%);
  border-radius: $border-radius*2;
  position: relative;
  overflow: hidden;

  &__header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color: #2d2d2d;
    padding: $offset-md $offset-xl;

    h2 {
      font-size: 0.9rem;
    }
  }

  &__settings-button {
    border: none;
    outline: none;
    padding: 0;
    background-color: transparent;

    &:hover .weather-widget__icon {
      color: #2d2d2d;
    }
  }

  &__icon {
    width: 1.25rem;
    height: 1.25rem;
    color: #7d7d7d;
    cursor: pointer;
    transition: color .2s ease-out;
  }
}
</style>