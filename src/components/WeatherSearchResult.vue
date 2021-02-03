<template>
  <li 
    class="search-pane__result-item"
    @click="onSelect"
  >
    <img 
      :src="iconLink" 
      alt="weather icon"
      class="search-pane__weather-icon"
    >
    <span class="search-pane__location">
      {{ fullLocation }}
    </span>
    <span class="search-pane__temp">
      {{ temperature }}
    </span>
  </li>
</template>

<script lang="ts">
import { WeatherSearchItemNormalized } from "@/weather-api/types";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    result: {
      type: Object as PropType<WeatherSearchItemNormalized>,
      required: true,
    },
  },

  emits: ["selectResult"],

  methods: {
    onSelect() {
      this.$emit("selectResult", {
        id: this.result.id,
        name: `${this.result.name}, ${this.result.country}`,
        lat: this.result.lat,
        lon: this.result.lon,
      });
    }
  },

  computed: {
    fullLocation(): string {
      return `${this.result.name}, ${this.result.country}`;
    },
    temperature(): string {
      const temp = this.result.temp;
      return temp > 0 ? `+${Math.round(temp)}°C` : `${Math.round(temp)}°C`;
    },
    iconLink(): string {    
      return `http://openweathermap.org/img/wn/${this.result.icon}@2x.png`;
    },
  },
})
</script>

<style lang="scss">
@import "../assets/variables";

.search-pane {
  &__result-item {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    background-color: #fff;
    box-shadow: $box-shadow;
    border-radius: $border-radius;
    padding: $offset-md;
    cursor: pointer;

    & + & {
      margin-top: $offset-md;
    }
  }

  &__weather-icon {
    width: 2.5rem;
    margin-right: $offset-md;
  }

  &__temp {
    font-size: 1.5rem;
    margin-left: auto;
  }
}

</style>