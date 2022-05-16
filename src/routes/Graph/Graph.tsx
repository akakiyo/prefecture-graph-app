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
    categories: [1960, 1965, 1970, 1975, 1980, 1985, 1990, 1995, 2000, 2005, 2010, 2015, 2020, 2025, 2030, 2035, 2040, 2045],
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
      {prefectureList.map((prefecture: Pref): JSX.Element => {
        return (
          <PrefCheckBox
            key={prefecture.prefCode}
            prefCode={prefecture.prefCode}
            prefName={prefecture.prefName}
            displayPrefList={displayPrefList}
            setDisplayPrefList={setDisplayPrefList}
          />
        );
      })}
      <Chart options={options} series={displayPrefList} width="700" type="line" />
    </Wrapper>
  );
};
const Wrapper = styled.div``;

export default Graph;
