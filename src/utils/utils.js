export const formatDate = (isoString) => {
  const data = new Date(isoString);
  return data.toLocaleDateString("pt-BR");
};

export const formatDateTime = (isoString) => {
  const data = new Date(isoString);
  return data.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const getSeverity = (flag) => {
  switch (flag) {
    case "Alto":
      return "success";

    case "Médio":
      return "secondary";

    case "Baixo":
      return "danger";

    default:
      return null;
  }
};
