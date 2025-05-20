import axios from "axios";
import { useTokenStore } from "../stores/token";

const Axios = axios.create({
  baseURL: "http://192.168.1.115/api/", //todo
  headers: {
    "Content-Type": "application/json",
  },
});

Axios.interceptors.request.use((config) => {
  const tokenStore = useTokenStore();
  const token = tokenStore.token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default Axios;
