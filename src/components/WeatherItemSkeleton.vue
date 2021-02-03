<template>
  <section class="weather-data-skeleton">
    <div class="weather-data-skeleton__title-row"></div>
    <div class="weather-data-skeleton__main-row"></div>
    <div class="weather-data-skeleton__desc-row"></div>
    
    <ul class="weather-data-skeleton__list">
      <li v-for="n in 6" :key="n"
        class="weather-data-skeleton__value"
      ></li>
    </ul>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  
})
</script>

<style lang="scss">
@import "../assets/variables";
$content-width: 360px;
$content-height: 250px;
$background: linear-gradient(170deg, rgba(242,242,242,1) 0%, rgba(196,196,196,1) 100%);
$background-size: 400% 400%;
$background-start: 0% 50%;
$background-end: 100% 50%;

.weather-data-skeleton {
  border-radius: $border-radius;
  background-color: #fff;
  width: $content-width;
  height: $content-height;
  box-shadow: $box-shadow;

  &__title-row {
    height: 34px;
    background-image: $background;
    background-size: $background-size;
    animation: gradient 3s ease infinite;
    border-top-left-radius: $border-radius;
    border-top-right-radius: $border-radius;
  }

  &__main-row {
    height: 100px;
  }

  &__desc-row {
    margin: 0 $offset-lg*2;
    height: 17px;
    border-radius: $border-radius;
    background-image: $background;
    background-size: $background-size;
    animation: gradient 7s ease infinite;
  }

  &__list {
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    margin: $offset-lg;
  }

  &__value {
    height: 14px;
    width: 135px;
    border-radius: $border-radius;
    background-image: $background;
    background-size: $background-size;
    animation: gradient 7s ease infinite;
    margin: $offset-xs $offset-md;
  }

  @keyframes gradient {
    0% {
      background-position: $background-start;
    }
    50% {
      background-position: $background-end;
    }
    100% {
      background-position: $background-start;
    }
  }
}
</style>