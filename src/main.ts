import { createApp } from "vue";
import App from "./App.vue";

class WeatherWidget extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const wrapper = document.createElement("aside");
    createApp(App).mount(wrapper);
    this.appendChild(wrapper.children[0]);
  }
}

window.customElements.define("weather-widget", WeatherWidget);
