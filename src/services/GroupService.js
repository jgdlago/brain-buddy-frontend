import Axios from "../axios/api";

export const getGroups = async (userId) => {
  const response = await Axios.get(`/group?responsible_user_id=${userId}`);
  return response.data.data;
};
