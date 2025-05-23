import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";

import PrimeVue from "primevue/config";

import "@primeuix/themes/aura";
import "primeicons/primeicons.css";
import {
  Button,
  Column,
  DataTable,
  Dialog,
  FloatLabel,
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
import Cadastro from "./components/Cadastro.vue";
import Instituicao from "./components/Form.vue";
import Form from "./components/Form.vue";

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
  // { path: "/", component: Form },
  { path: "/cadastro", component: Cadastro },
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
app.component("FloatLabel", FloatLabel);
app.component("Button", Button);
app.component("Toolbar", Toolbar);
app.component("DataTable", DataTable);
app.component("Column", Column);
app.component("Select", Select);
app.component("Dialog", Dialog);

app.mount("#app");
