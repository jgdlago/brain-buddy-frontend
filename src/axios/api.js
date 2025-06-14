import axios from "axios";
import { useUserStore } from "../stores/userStore";

const Axios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
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

export default Axios;
