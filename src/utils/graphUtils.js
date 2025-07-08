// const graphOutline1 = "rgba(255, 99, 132, 0.2)"; // Soft Red
// const graphOutline2 = "rgba(54, 162, 235, 0.2)"; // Soft Blue
// const graphOutline3 = "rgba(255, 206, 86, 0.2)"; // Soft Yellow
// const graphOutline4 = "rgba(75, 192, 192, 0.2)"; // Soft Teal
// const graphOutline5 = "rgba(153, 102, 255, 0.2)"; // Soft Purple
// const graphOutline6 = "rgba(255, 159, 64, 0.2)"; // Soft Orange

// const graphColor1 = "rgb(255, 99, 132)";
// const graphColor2 = "rgb(54, 162, 235)";
// const graphColor3 = "rgb(255, 206, 86)";
// const graphColor4 = "rgb(75, 192, 192)";
// const graphColor5 = "rgb(153, 102, 255)";
// const graphColor6 = "rgb(255, 159, 64)";

export const createChart = ({
  type = "bar",
  labels = [],
  datasets = [],
  title = "",
  stacked = false,
}) => {
  const series = datasets.map((ds) => ({
    name: ds.label,
    data: ds.data,
  }));

  const options = {
    chart: {
      type,
      stacked,
      toolbar: { show: false },
    },
    title: {
      text: title,
      align: "center",
      style: {
        fontSize: "16px",
        fontWeight: "bold",
      },
    },
    xaxis: {},
    labels: [],
    legend: {
      position: "top",
    },
  };

  if (type === "bar" || type === "line") {
    options.xaxis = {
      categories: labels,
    };
  }

  if (type === "pie" || type === "donut") {
    options.labels = labels;
  }

  if (stacked && (type === "bar" || type === "line")) {
    options.plotOptions = {
      bar: {
        horizontal: false,
      },
    };
  }

  return {
    type,
    series,
    options,
  };
};
