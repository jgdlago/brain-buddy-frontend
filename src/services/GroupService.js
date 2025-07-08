import Axios from "../axios/api";

export const getGroups = async (userId) => {
  const response = await Axios.get(`/group?responsible_user_id=${userId}`);
  return response.data.data;
};

export const listGroups = async (userId) => {
  const response = await Axios.get(`/list/group?responsible_user_id=${userId}`);
  return response.data;
};

export const listEducationLevel = async () => {
  const response = await Axios.get(`/list/education-level`);
  console.log(response)
  return response.data;
};
