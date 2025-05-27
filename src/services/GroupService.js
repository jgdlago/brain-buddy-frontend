export const getGroups = async (userId) => {
  const response = await Axios.post(`/list/group?user=${userId}`);
  return response.data;
};
