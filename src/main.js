import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";

import PrimeVue from "primevue/config";

import "@primeuix/themes/aura";
import "primeicons/primeicons.css";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionPanel,
  Button,
  Column,
  DataTable,
  IftaLabel,
  InputText,
  Password,
  Select,
  Toolbar,
} from "primevue";
import { ColorScheme } from "./assets/ColorScheme";
import Login from "./components/Login.vue";
import { createMemoryHistory, createRouter } from "vue-router";
import { createPinia } from "pinia";
import PlayerList from "./components/PlayerList.vue";

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

const routes = [
  { path: "/", component: Login },
  { path: "/players", component: PlayerList },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

const pinia = createPinia();

app.use(router);
app.use(pinia);

app.component("InputText", InputText);
app.component("Password", Password);
app.component("IftaLabel", IftaLabel);
app.component("Button", Button);
app.component("Toolbar", Toolbar);
app.component("DataTable", DataTable);
app.component("Column", Column);
app.component("Select", Select);

app.mount("#app");
