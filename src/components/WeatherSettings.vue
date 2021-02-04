<template>
  <section class="weather-settings">
    <ul class="locations">
      <!--Enables drag-n-drop for children components-->
      <draggable
        :list="locations"
        handle=".location__icon_move"
        @end="$emit('updateOrder')"
      >
        <weather-location-item 
          :key="location.id"
          v-for="location in locations"
          :location="location"
          @remove-location="removeLocation"
        ></weather-location-item>
      </draggable>
    </ul>
    <weather-location-input
      :error="error"
      @submit-location="searchQuery = $event"
    ></weather-location-input>
  </section>

  <!--Hidden by default, search pane shows when multiple match cases are returned on user's request-->
  <section :class="['search-pane', searchPaneClassNames]">
    <weather-search-pane
      :searchResults="searchResults"
      @select-result="addLocation"
    ></weather-search-pane>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import WeatherLocationItem from "./WeatherLocationItem.vue";
import WeatherLocationInput from "./WeatherLocationInput.vue";
import WeatherSearchPane from "./WeatherSearchPane.vue";
import { OpenWeatherAPI } from "@/weather-api";
import { SearchPaneClassNames, WeatherSettingsData } from "./types";
import { WeatherLocation } from "@/weather-api/types";
import { VueDraggableNext } from "vue-draggable-next";

export default defineComponent({
  components: {
    "weather-location-item": WeatherLocationItem,
    "weather-location-input": WeatherLocationInput,
    "weather-search-pane": WeatherSearchPane,
    "draggable": VueDraggableNext,
  },

  data(): WeatherSettingsData {
    return {
      selectResultOpen: false,
      searchResults: null,
      searchQuery: "",
      error: null,
    };
  },

  props: {
    locations: Array as PropType<WeatherLocation[]>,
  },
  emits: [
    "addLocation", 
    "removeLocation",
    "updateOrder",
  ],

  computed: {
    searchPaneClassNames(): SearchPaneClassNames {
      return {
        "search-pane_is-active": this.selectResultOpen,
      };
    }
  },

  methods: {
    async fetchLocations(query: string) {
      const response = await OpenWeatherAPI.getLocation(query);
      if (response) {
        this.error && (this.error = null);
        if (response instanceof Array) {
          this.selectResultOpen = true;
          this.searchResults = response;
        }
        else {
          this.$emit("addLocation", response);
        }
      }
      else {
        this.error = "Couldn't find cities matching your search query. Please check your spelling or try searching for another location!";
      }
    },

    addLocation(e: WeatherLocation) {
      this.selectResultOpen = false;
      this.searchResults = null;
      this.$emit("addLocation", e);
    },
    removeLocation(e: WeatherLocation) {
      this.$emit("removeLocation", e);
    },
  },

  watch: {
    searchQuery(newQuery, oldQuery) {
      if (newQuery !== oldQuery) {
        this.fetchLocations(newQuery);
      }
    }
  },
});
</script>

<style lang="scss">
@import "../assets/variables";

.weather-settings {
  padding: 0 $offset-xl $offset-xl;
}
.search-pane {
  position: absolute;
  top: 0;
  opacity: 0;
  left: -1000px;
  width: 100%;
  height: 100%;
  transition: left .3s ease-out, opacity .3s ease-out;
  background-image: linear-gradient(162deg, rgba(249,249,249,1) 0%, rgba(245,245,245,1) 100%);
  overflow-y: scroll;

  &_is-active {
    left: 0;
    opacity: 1;
  }

  &::-webkit-scrollbar {
    display: none;
  }
}
</style>