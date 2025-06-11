import Axios from "../axios/api";

export const getPlayers = async (groupId) => {
  const response = await Axios.get(`/player?group=${groupId}`);
  return response.data.data;
};
