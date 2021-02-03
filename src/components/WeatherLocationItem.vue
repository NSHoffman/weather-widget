<template>
  <li class="location__item">
    <font-awesome-icon
      icon="bars"
      class="location__icon location__icon_move"
    ></font-awesome-icon>
    <span>{{ location.name }}</span>
    <font-awesome-icon 
      icon="trash-alt"
      class="location__icon location__icon_remove" 
      @click.prevent="removeLocation"
    ></font-awesome-icon>
  </li>
</template>

<script lang="ts">
import { WeatherLocation } from "@/weather-api/types";
import { defineComponent, PropType } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBars, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faBars, faTrashAlt);

export default defineComponent({
  components: {
    "font-awesome-icon": FontAwesomeIcon,
  },

  props: {
    location: {
      type: Object as PropType<WeatherLocation>,
      required: true,
    },
  },

  emits: ["removeLocation"],

  methods: {
    removeLocation() {
      this.$emit("removeLocation", this.location);
    },
  },
})
</script>

<style lang="scss">
@import "../assets/variables";
$icon-faded: #7d7d7d;
$icon-active: #2d2d2d;

.location {
  &__item {
    display: flex;
    padding: 0.5rem;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    background-color: #fff;
    box-shadow: $box-shadow;
    border-radius: $border-radius;

    & + .location__item {
      margin-top: $offset-md;
    }

    &_dragged {
      opacity: 0;
    }
  }

  &__icon {
    width: 1.2rem;
    height: 1.2rem;
    color: $icon-faded;
    cursor: pointer;
    transition: color .2s ease-in;

    &_move {
      cursor: grab;
      margin-right: $offset-lg;

      &:hover {
        color: $icon-active;
      }
      &:active {
        cursor: grabbing;
      }
    }

    &_remove {
      margin-left: auto;

      &:hover {
        color: $theme-color;
      }
    }
  }
}
</style>