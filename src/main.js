import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";

import PrimeVue from "primevue/config";

import "@primeuix/themes/aura";
import "primeicons/primeicons.css";
import { ColorScheme } from "./assets/ColorScheme";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import router from "./router";
import { ToastService } from "primevue";

const app = createApp(App);

app.use(PrimeVue, {
  theme: {
    preset: ColorScheme,
    options: {
      prefix: "p",
      darkModeSelector: false,
      cssLayer: false,
    },
  },
});

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(ToastService);
app.use(router);

app.mount("#app");
