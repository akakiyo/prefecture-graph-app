import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import styled from "styled-components";

import axios, { AxiosRequestConfig, AxiosError } from "axios";
import { Pref, GraphingPref } from "../../types/Pref";
import { ErrorResponse } from "../../types/ErrorResponse";
import PrefCheckBox from "./PrefCheckBox";
import { options } from "./chartOptions";
import { MobaileSiteStyle } from "../../styles/styledMediaQuery";

const Graph = (): JSX.Element => {
  const [prefectureList, setPrefectureList] = useState<Array<Pref>>([]);
  const [displayPrefList, setDisplayPrefList] = useState<Array<GraphingPref>>([]);

  const getPrefectureList = async () => {
    const getPrefectureListOption: AxiosRequestConfig = {
      url: "https://opendata.resas-portal.go.jp/api/v1/prefectures",
      method: "GET",
      headers: { "X-API-KEY": `${process.env.REACT_APP_RESAS_API_KEY}` },
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
    <>
      <PrefCheckBoxArea>
        {prefectureList &&
          prefectureList.map(
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
      </PrefCheckBoxArea>
      {displayPrefList.length === 0 ? (
        <InstructionText>人口を知りたい都道府県をテェックしてください</InstructionText>
      ) : (
        <StyledChart options={options} series={displayPrefList} type="line" />
      )}
    </>
  );
};

const PrefCheckBoxArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 1em;
`;
const InstructionText = styled.div`
  text-align: center;
  margin-top: 4em;
  font-size: 20px;
  font-weight: bold;
`;
const StyledChart = styled(Chart)`
  width: 700px;
  margin: 4em auto;
  ${MobaileSiteStyle`width:350px;`}
`;
export default Graph;
