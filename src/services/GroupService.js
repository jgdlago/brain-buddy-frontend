import Axios from "../axios/api";

export const getGroups = async (userId) => {
  const response = await Axios.get(`/group?responsible_user_id=${userId}`);
  return response.data.data;
};

export const listGroups = async (userId) => {
  const response = await Axios.get(`/list/group?responsible_user_id=${userId}`);
  console.log(response.data);
  return response.data;
};

export const groupReport = async (body) => {
  const response = await Axios.get(`/group/report`, body);
  return response.data.data;
};
