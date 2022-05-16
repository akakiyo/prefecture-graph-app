import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios, { AxiosRequestConfig, AxiosError } from "axios";
import { Pref, ResPopulationDataType } from "../../types/Pref";

type ErrorResponse = {
  error: string;
};
type PrefPopulation = {
  prefName: string;
  populationlist: Array<ResPopulationDataType>;
};
type DisplayPrefPopulation = {
  prefName: string;
  populationlist: Array<ResPopulationDataType>;
};
const Ranking = (): JSX.Element => {
  const [prefectureList, setPrefectureList] = useState<Array<PrefPopulation>>([]);
  //const [displayPrefList, setDisplayPrefList] = useState < Array<DisplayPrefPopulation>([]);
  const [selectedYear, setSelectedYear] = useState<number>();
  const getAllPref = async () => {
    const getPrefectureListOption: AxiosRequestConfig = {
      url: "https://opendata.resas-portal.go.jp/api/v1/prefectures",
      method: "GET",
      headers: { "X-API-KEY": `${process.env.REACT_APP_RESAS_API_KEY}` },
    };
    // let prefectureList: Array<Pref>;
    const prefectureList = await axios(getPrefectureListOption)
      .then((res) => {
        return res.data.result;
      })
      .catch((e: AxiosError<ErrorResponse>) => {
        console.error(e);
      });

    const promiseList = prefectureList.map(async (prefecture: Pref) => {
      const getPopulationOnePrefOption: AxiosRequestConfig = {
        url: "https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear",
        method: "GET",
        headers: { "X-API-KEY": `${process.env.REACT_APP_RESAS_API_KEY}` },
        params: { prefCode: prefecture.prefCode },
      };
      const populationList = await axios(getPopulationOnePrefOption).then((res) => res.data.result.data[0].data);

      return { prefName: prefecture.prefName, populationList };
    });
    const result = await Promise.all(promiseList);
    setPrefectureList(result);
  };

  useEffect(() => {
    getAllPref();
  }, []);
  console.log(prefectureList);

  return <Wrapper>ランキング</Wrapper>;
};
const Wrapper = styled.div``;
export default Ranking;
