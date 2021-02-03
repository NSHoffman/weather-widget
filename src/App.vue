<template>
  <weather-widget></weather-widget>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import WeatherWidget from './components/WeatherWidget.vue';

export default defineComponent({
  name: 'App',
  components: {
    "weather-widget": WeatherWidget,
  },
});
</script>

<style>
@import "./assets/reset.css";

@font-face {
  font-family: "HelveticaNeueCyr";
  font-weight: 400;
  src: local("HelveticaNeueCyr")
    url("./assets/fonts/HelveticaNeueCyr-Roman.otf") format("otf");
}

@font-face {
  font-family: "HelveticaNeueCyr";
  font-weight: 500;
  src: local("HelveticaNeueCyr")
    url("./assets/fonts/HelveticaNeueCyr-Medium.otf") format("otf");
}

html {
  font-size: 16px;
}

* {
  box-sizing: border-box;
}

#app {
  font-family: Helvetica, "Segoe UI", Arial, sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

h1,h2,h3,h4,h5,h6 {
  font-weight: bold;
}

h1 {
  font-size: 2rem;
}
h2 {
  font-size: 1.75rem;
}
h3 {
  font-size: 1.5rem;
}
h4 {
  font-size: 1.25rem;
}
span, p {
  font-size: 1rem;
}

</style>
