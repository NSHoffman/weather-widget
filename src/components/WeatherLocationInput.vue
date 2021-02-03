<template>
  <section class="location-input">
    <label 
      for="location-input"
      class="location-input__label"
    >
      Add Location:
    </label>
    <input id="location-input"
      type="text"
      autocomplete="off"
      v-model="value" 
      @keydown.enter="onSubmit"
      class="location-input__text"
    >
    <button 
      @click.prevent="onSubmit"
      class="location-input__submit"
    >
      <font-awesome-icon
        icon="arrow-right"
        class="location-input__submit-icon"
      ></font-awesome-icon>
    </button>

    <span class="location-input__error" v-if="error">
      {{ error }}
    </span>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faArrowRight);

export default defineComponent({
  components: {
    "font-awesome-icon": FontAwesomeIcon,
  },

  data() {
    return {
      value: "",
    };
  },

  props: {
    error: {
      type: String,
    },
  },

  emits: ["submitLocation"],
  
  methods: {
    onSubmit() {
      this.$emit("submitLocation", this.value);
      this.value = "";
    }
  }
})
</script>

<style lang="scss">
@import "../assets/variables";
$inset-shadow: inset 0 -0.25rem $theme-color;

.location-input {
  padding: $offset-xl 0 0;

  &__label {
    display: block;
    margin-bottom: $offset-xs;
    font-weight: 600;
    font-size: 0.8rem;
  }

  &__text {
    border: none;
    border-top-left-radius: $border-radius;
    border-bottom-left-radius: $border-radius;
    padding: $offset-md $offset-xl;
    transition: box-shadow .2s ease-in;
    width: calc(100% - 1.75rem);

    &:focus {
      outline: none;
      box-shadow: $inset-shadow;

      & + .location-input__submit {
        background-color: $theme-color;
      }
    }
  }

  &__submit {
    border: none;
    border-top-right-radius: $border-radius;
    border-bottom-right-radius: $border-radius;
    background-color: #adadad;
    color: #fff;
    padding: $offset-md;
    cursor: pointer;
    transition: background-color .2s ease-out;

    &-icon {
      transition: transform .2s ease-out;
    }

    &:hover &-icon {
      transform: scale(1.25);
    }
  }

  &__error {
    display: block;
    margin-top: $offset-xs;
    color: #ff4646;
    font-size: 0.75rem;
  }
}
</style>