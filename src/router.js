import { createRouter, createWebHistory } from "vue-router";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import PlayerList from "./views/PlayerList.vue";
import AppLayout from "./layouts/AppLayout.vue";
import AuthLayout from "./layouts/AuthLayout.vue";

// component: () => import("@/components/Login.vue")

const routes = [
  { path: "/", component: Login },
  {
    path: "/app",
    component: AppLayout,
    children: [
      { path: "/players", component: PlayerList },
      // { path: "/form", component: Form },
    ],
  },
  {
    path: "/auth",
    component: AuthLayout,
    children: [
      { path: "/login", component: Login },
      { path: "/register", component: Register },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
