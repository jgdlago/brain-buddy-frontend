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

export const PERFORMANCE = {
  very_high: {
    index: 4,
    severity: "success",
    label: "Muito alto",
  },
  high: {
    index: 3,
    severity: "success",
    label: "Alto",
  },
  medium: {
    index: 2,
    severity: "secondary",
    label: "Médio",
  },
  low: {
    index: 1,
    severity: "danger",
    label: "Baixo",
  },
  very_low: {
    index: 0,
    severity: "danger",
    label: "Muito baixo",
  },
};

export const toastSuccess = (toast, message, summary = "Sucesso") => {
  toast.add({ severity: "success", summary, detail: message, life: 3000 });
};

export const toastInfo = (toast, message, summary = "Aviso") => {
  toast.add({ severity: "info", summary, detail: message, life: 3000 });
};

export const toastError = (toast, message, summary = "Erro") => {
  toast.add({ severity: "error", summary, detail: message, life: 3000 });
};

export const formatParams = (rawParams) => {
  Object.fromEntries(
    Object.entries(rawParams).filter(([_, value]) => {
      if (Array.isArray(value)) return value.length > 0;
      return value !== null && value !== undefined && value !== "";
    })
  );
};
