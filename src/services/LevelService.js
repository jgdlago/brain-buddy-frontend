import Axios from "../axios/api";

export const listLevel = async () => {
  const response = await Axios.get(`/list/level`);
  return Object.values(response.data);
};
