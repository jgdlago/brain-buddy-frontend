import axios from "axios";
import { useUserStore } from "../stores/userStore";
import router from "../router";

const Axios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

Axios.interceptors.request.use((config) => {
  const userStore = useUserStore();
  const token = userStore.token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

Axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const userStore = useUserStore();
      userStore.logout();
      router.push("/login");
    }

    return Promise.reject(error);
  }
);

export default Axios;
