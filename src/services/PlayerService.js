export const getPlayers = async (groupId) => {
  const response = await Axios.post(`/list/player?group=${groupId}`);
  return response.data;
};
