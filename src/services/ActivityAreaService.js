import Axios from "../axios/api";

export const getActivityArea = async () => {
  const response = await Axios.get(`/activity-area`);
  return response.data.data;
};

export const addActivityArea = async (body) => {
  const response = await Axios.post(`/activity-area`, body);
  return response.data.data;
};

export const updateActivityArea = async (body) => {
  const response = await Axios.put(`/activity-area/${body.id}`, body);
  return response.data.data;
};

export const deleteActivityArea = async (id) => {
  const response = await Axios.delete(`/activity-area/${id}`);
  return response.data.data;
};

export const listActivityArea = async () => {
  const response = await Axios.get(`/list/activity-area`);
  return Object.values(response.data);
};
