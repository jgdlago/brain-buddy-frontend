import axios from "axios";
import { useUserStore } from "../stores/userStore";

const Axios = axios.create({
  // baseURL: "http://192.168.1.115/api/",
  baseURL: "http://localhost/api/",
  headers: {
    "Content-Type": "application/json",
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
