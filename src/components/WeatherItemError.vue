<template>
  <section class="weather-item-error">
    <div class="weather-item-error__message">
      <slot></slot>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  
})
</script>

<style lang="scss">
.weather-item-error {
  border-radius: 0.25rem;
  background-color: rgb(255, 172, 172);
  width: 360px;
  height: 230px;
  box-shadow: 0 0 1rem 0 rgba(0,0,0,0.075);
  position: relative;

  &__message {
    position: absolute;
    top: 50%;
    left: 50%;
    color: #ff4646;
    transform: translate(-50%,-50%);
    text-align: center;
  }
}
</style>