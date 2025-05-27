import Axios from "../axios/api";

export const getGroups = async (userId) => {
  const response = await Axios.get(`/list/group?responsible_user_id=${userId}`); //TODO filtro n ta funcionando
  return response.data;
};
