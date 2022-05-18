export const options = {
  chart: {
    foreColor: "black",
    background: "white",
    toolbar: {
      show: true,
      offsetX: -40,
      offsetY: 0,
      tools: {
        download: true,
        selection: true,
        zoom: true,
        zoomin: true,
        zoomout: true,
        pan: true,
        reset: true,
        customIcons: [],
      },
    },
  },
  xaxis: {
    title: {
      text: "年度",
      style: {
        color: "#000000",
      },
    },
    categories: [1960, 1965, 1970, 1975, 1980, 1985, 1990, 1995, 2000, 2005, 2010, 2015, 2020, 2025, 2030, 2035, 2040, 2045],
  },
  yaxis: {
    title: {
      text: "人口数",
      rotate: 0,

      style: {
        color: "#000000",
      },
    },
  },
  legend: {
    position: "right",
    showForSingleSeries: true,
    itemMargin: {
      horizontal: 0,
      vertical: 0,
    },
  },
};
