import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import styled from "styled-components";
import axios, { AxiosRequestConfig, AxiosError } from "axios";
import { Pref, DisplayPref } from "../../types/Pref";
import PrefCheckBox from "./PrefCheckBox";

const options = {
  chart: {
    foreColor: "black", //テキストの色
    background: "white", //chartの背景色
  },
  xaxis: {
    title: {
      text: "年度",
      offsetX: 300,
      offsetY: -10,
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
      offsetX: 0,
      offsetY: -220,
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
const Graph = (): JSX.Element => {
  const [prefectureList, setPrefectureList] = useState<Array<Pref>>([]);
  const [displayPrefList, setDisplayPrefList] = useState<Array<DisplayPref>>([]);

  const getPrefectureList = async () => {
    const getPrefectureListOption: AxiosRequestConfig = {
      url: "https://opendata.resas-portal.go.jp/api/v1/prefectures",
      method: "GET",
      headers: { "X-API-KEY": `${process.env.REACT_APP_RESAS_API_KEY}` },
    };
    type ErrorResponse = {
      error: string;
    };
    await axios(getPrefectureListOption)
      .then((res) => {
        setPrefectureList(res.data.result);
      })
      .catch((e: AxiosError<ErrorResponse>) => {
        console.error(e);
      });
  };

  useEffect(() => {
    getPrefectureList();
  }, []);

  return (
    <Wrapper>
      {prefectureList.map(
        (prefecture: Pref): JSX.Element => (
          <PrefCheckBox
            key={prefecture.prefCode}
            prefCode={prefecture.prefCode}
            prefName={prefecture.prefName}
            displayPrefList={displayPrefList}
            setDisplayPrefList={setDisplayPrefList}
          />
        )
      )}
      {displayPrefList.length !== 0 && <StyledChart options={options} series={displayPrefList} type="line" />}
    </Wrapper>
  );
};
const Wrapper = styled.div``;
const StyledChart = styled(Chart)`
  width: 800px;
  margin: 4em auto;
`;
export default Graph;
