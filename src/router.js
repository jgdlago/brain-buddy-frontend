import { createRouter, createWebHistory } from "vue-router";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import Player from "./views/Player.vue";
import AppLayout from "./layouts/AppLayout.vue";
import AuthLayout from "./layouts/AuthLayout.vue";
import ActivityArea from "./views/ActivityArea.vue";
import Institutions from "./views/Institutions.vue";

// component: () => import("@/components/Login.vue")

const routes = [
  { path: "/", component: Login },
  {
    path: "/app",
    component: AppLayout,
    children: [
      { path: "/player", component: Player },
      { path: "/activity-area", component: ActivityArea },
      { path: "/institutions", component: Institutions },
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
