<template>
  <ul class="weather-list">
    <weather-item
      v-for="location in locations"
      :key="location.id"
      :location="location"
    ></weather-item>
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { WeatherLocation } from "../weather-api/types";
import WeatherItem from "./WeatherItem.vue";
export default defineComponent({
  components: {
    "weather-item": WeatherItem,
  },

  props: {
    locations: {
      type: Array as PropType<WeatherLocation[]>,
      required: true,
    },
  },
});
</script>

<style lang="scss">
@import "../assets/variables";

.weather-list {
  padding: 0 $offset-xl $offset-xl;
}
</style>