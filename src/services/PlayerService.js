import Axios from "../axios/api";

export const getPlayers = async (groupId) => {
  const response = await Axios.get(`/player?group=${groupId}`);
  console.log(response.data.data);
  return response.data.data;
};
