import Axios from "../axios/api";
import qs from "qs";
import { formatParams } from "../utils/utils";

export const getGroups = async (userId) => {
  const response = await Axios.get(`/group?responsible_user_id=${userId}`);
  return response.data.data;
};

export const listGroups = async (userId) => {
  const response = await Axios.get(`/list/group?responsible_user_id=${userId}`);
  return response.data;
};

export const groupReport = async (axiosParams) => {
  const response = await Axios.get(`/group/report`, {
    params: axiosParams,
  });
  return response.data.data;
};
