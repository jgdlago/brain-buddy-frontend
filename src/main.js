import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";

import PrimeVue from "primevue/config";

import "@primeuix/themes/aura";
import "primeicons/primeicons.css";

const app = createApp(App);

app.use(PrimeVue, {
  theme: {
    options: {
      prefix: "p",
      darkModeSelector: false,
      cssLayer: false,
    },
  },
});

app.mount("#app");
