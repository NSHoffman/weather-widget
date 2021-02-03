<template>
  <h3 class="search-pane__heading">Select the right city</h3>
  <ul class="search-pane__matches">
    <weather-search-result
      :key="result.id"
      v-for="result in searchResults"
      :result="result"
      @select-result="onSelect"
    ></weather-search-result>
  </ul>
</template>

<script lang="ts">
import { WeatherLocation } from "@/weather-api/types";
import { defineComponent } from "vue";
import WeatherSearchResult from "./WeatherSearchResult.vue";

export default defineComponent({
  components: { WeatherSearchResult },
  props: {
    searchResults: Array,
  },
  emits: ["selectResult"],
  methods: {
    onSelect(e: WeatherLocation) {
      this.$emit("selectResult", e);
    },
  }
});
</script>

<style lang="scss">
@import "../assets/variables";

.search-pane__heading {
  padding: $offset-lg;
  font-size: 0.9rem;
}

.search-pane__matches {
  padding: 0 $offset-lg $offset-lg;
}
</style>