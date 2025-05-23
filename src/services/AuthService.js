import Axios from "../axios/axios";
import { useTokenStore } from "../stores/token";

export const login = async ({ email, senha }) => {
  if (email == "admin" && senha == "admin") {
    //TODO temp
    return;
  }

  const response = await Axios.post("/auth/login", {
    email: email,
    password: senha,
  });

  const tokenStore = useTokenStore();
  tokenStore.set(response.data.token);

  return response.data;
};

export const register = async ({ nome, email, senha, senhaConf }) => {
  const response = await Axios.post("/auth/register", {
    name: nome,
    email: email,
    password: senha,
    password_confirmation: senhaConf,
  });

  const tokenStore = useTokenStore();
  tokenStore.set(response.data.token);

  return response.data;
};

export const recover = async (email) => {
  const response = await Axios.post("/auth/forgot-password", {
    email: email,
  });

  return response.data;
};
