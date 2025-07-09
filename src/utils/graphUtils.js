export const createChart = ({
  type = "bar",
  labels = [],
  datasets = [],
  title = "",
  stacked = false,
  horizontal = false,
  height = 350,
  dataLabels = false,
  stepSize = 20
}) => {
  const series = datasets.map((ds) => ({
    name: ds.label,
    data: ds.data,
  }));

  const options = {
    chart: {
      type,
      height,
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
    plotOptions: {
      bar: {
        borderRadius: 4,
        borderRadiusApplication: 'end',
        horizontal,
        dataLabels: {
          position: 'center',
        }
      }
    },
    dataLabels: {
      enabled: dataLabels,
    },
    xaxis: {
      categories: labels
    },
    yaxis: {
      categories: labels
    },
    labels: [],
    legend: {
      position: "top",
    },
  };

  if (type === "radar") {
    options.yaxis = {
      stepSize: stepSize,
      min: 0,
      max: 20,
    };
    options.xaxis = {
      categories: labels,
    };
  } else if (type === "bar" || type === "line") {
    if (horizontal) {
      options.yaxis = {
        categories: labels,
      };
    } else {
      options.xaxis = {
        categories: labels,
      };
    }
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