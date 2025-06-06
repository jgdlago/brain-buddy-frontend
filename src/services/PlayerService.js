import Axios from "../axios/api";

export const getPlayers = async (groupId) => {
  // const response = await Axios.get(`/player?group=${groupId}`);
  // return response.data.data;
  //TODO provisório
  let response = await Axios.get(`/player?group=${groupId}`);
  const options = ["Alto", "Médio", "Baixo"];
  return response.data.data.map((player, index) => {
    return {
      ...player,
      performance_flag: options[index % 3],
    };
  });
};
