import Axios from "../axios/api";

export const getInstitutions = async () => {
  const response = await Axios.get(`/institution`);
  return response.data.data;
};

export const addInstitution = async (body) => {
  const response = await Axios.post(`/institution`, {
    name: body.name,
    cnpj: body.cnpj,
    activity_area_id: body.activity_area.id,
    owner_user_id: body.owner_user.id,
  });
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
