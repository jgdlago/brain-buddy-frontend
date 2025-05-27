import Axios from "../axios/api";

export const getInstitutions = async () => {
  const response = await Axios.get(`/institution`);
  return response.data.data;
};

export const addInstitution = async (body) => {
  const response = await Axios.post(`/institution`, body);
  return response.data.data;
};

export const updateInstitution = async (body) => {
  const response = await Axios.put(`/institution/${body.id}`, body);
  return response.data.data;
};

export const deleteInstitution = async (id) => {
  const response = await Axios.delete(`/institution/${id}`);
  return response.data.data;
};
