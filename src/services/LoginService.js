import Axios from "../axios/axios";
import { useTokenStore } from "../stores/token";

export const login = async (email, senha) => {
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
