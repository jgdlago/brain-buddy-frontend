import Axios from "../axios/api";

export const listUsers = async () => {
  const response = await Axios.get(`/list/user/`);
  return response.data;
};
