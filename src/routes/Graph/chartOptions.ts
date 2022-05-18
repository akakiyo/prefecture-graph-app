export const options = {
  chart: {
    foreColor: "black", //テキストの色
    background: "white", //chartの背景色
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
    offsetX: -40,
    offsetY: 20,
    showForSingleSeries: true,
    itemMargin: {
      horizontal: 40,
      vertical: 0,
    },
  },
};
