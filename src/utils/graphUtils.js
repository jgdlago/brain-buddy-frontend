const graphOutline1 = "rgba(255, 99, 132, 0.2)"; // Soft Red
const graphOutline2 = "rgba(54, 162, 235, 0.2)"; // Soft Blue
const graphOutline3 = "rgba(255, 206, 86, 0.2)"; // Soft Yellow
const graphOutline4 = "rgba(75, 192, 192, 0.2)"; // Soft Teal
const graphOutline5 = "rgba(153, 102, 255, 0.2)"; // Soft Purple
const graphOutline6 = "rgba(255, 159, 64, 0.2)"; // Soft Orange

const graphColor1 = "rgb(255, 99, 132)";
const graphColor2 = "rgb(54, 162, 235)";
const graphColor3 = "rgb(255, 206, 86)";
const graphColor4 = "rgb(75, 192, 192)";
const graphColor5 = "rgb(153, 102, 255)";
const graphColor6 = "rgb(255, 159, 64)";

export const createChart = ({ type, labels, label, data }) => {
  const baseChart = {
    type,
    data: {
      labels,
      datasets: [
        {
          label,
          data,
          backgroundColor: [
            graphOutline1,
            graphOutline2,
            graphOutline3,
            graphOutline4,
            graphOutline5,
            graphOutline6,
          ],
          borderColor: [
            graphColor1,
            graphColor2,
            graphColor3,
            graphColor4,
            graphColor5,
            graphColor6,
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {},
  };

  if (type === "bar") {
    baseChart.options = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };
  }

  if (type === "pie") {
    baseChart.options = {
      plugins: {
        legend: {
          position: "top",
        },
      },
    };
  }

  return baseChart;
};
