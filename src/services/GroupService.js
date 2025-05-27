import Axios from "../axios/api";

export const getGroups = async (userId) => {
  const response = await Axios.get(`/group?responsible_user_id=${userId}`);
  console.log(response.data.data);
  return response.data.data;
};
