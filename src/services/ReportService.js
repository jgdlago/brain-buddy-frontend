import Axios from "../axios/api";

export const report = async (axiosParams) => {
  const response = await Axios.get(`/player-progress/report`, {
    params: axiosParams,
  });
  return response.data;
};

export const reportExcel = async (axiosParams) => {
  const response = await Axios.get("/player-progress/report-excel", {
    params: axiosParams,
    responseType: "blob",
  });

  const blob = new Blob([response.data], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "relatorio_aprendizado.xlsx");
  document.body.appendChild(link);
  link.click();
  link.remove();

  window.URL.revokeObjectURL(url);
};
