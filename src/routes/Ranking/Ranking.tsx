import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios, { AxiosRequestConfig, AxiosError } from "axios";
import { Pref, ResPopulationDataType } from "../../types/Pref";
import { ErrorResponse } from "../../types/ErrorResponse";
import YearRadioButton from "./YearRadioButton";
import { MobaileSiteStyle } from "../../styles/styledMediaQuery";

type PrefPopulation = {
  prefName: string;
  populationList: Array<ResPopulationDataType>;
};
type DisplayPref = {
  prefName: string;
  population: number;
};
const Ranking = (): JSX.Element => {
  const [prefectureList, setPrefectureList] = useState<Array<PrefPopulation>>([]);
  const [displayPrefList, setDisplayPrefList] = useState<Array<DisplayPref>>([]);
  const [years, setYears] = useState<Array<number>>([]);
  const [selectedYear, setSelectedYear] = useState<number>();

  const getAllPref = async () => {
    const getPrefectureListOption: AxiosRequestConfig = {
      url: "https://opendata.resas-portal.go.jp/api/v1/prefectures",
      method: "GET",
      headers: { "X-API-KEY": `${process.env.REACT_APP_RESAS_API_KEY}` },
    };

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

    const extracetedYears = result[0]["populationList"].map((population: ResPopulationDataType): number => {
      return population.year;
    });
    setYears(extracetedYears);
    setPrefectureList(result);
  };

  useEffect(() => {
    getAllPref();
  }, []);

  useEffect(() => {
    const tmp = prefectureList.map((prefecture: PrefPopulation): DisplayPref => {
      const extractedPopulation = prefecture.populationList.filter((population) => population.year === selectedYear);

      return { prefName: prefecture.prefName, population: extractedPopulation[0].value };
    });
    const sortedPref = tmp.sort((a, b) => {
      if (a.population < b.population) {
        return 1;
      } else {
        return -1;
      }
    });
    setDisplayPrefList(sortedPref);
  }, [selectedYear]);

  return (
    <>
      <YearRadioButtonArea>
        {years.map((year: number) => {
          return <YearRadioButton key={year} year={year} setSelectedYear={setSelectedYear} />;
        })}
      </YearRadioButtonArea>

      {selectedYear ? (
        <DisplayPrefOl>
          {displayPrefList &&
            displayPrefList.map((displayPref) => {
              return (
                <DisplayPrefLi key={displayPref.prefName}>
                  <PrefName>{displayPref.prefName}</PrefName>
                  <Population>????????????{displayPref.population}</Population>
                </DisplayPrefLi>
              );
            })}
        </DisplayPrefOl>
      ) : (
        <InstructionText>????????????????????????????????????????????????????????????</InstructionText>
      )}
    </>
  );
};

const YearRadioButtonArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 1em;
`;
const DisplayPrefOl = styled.ol`
  margin: 4em auto;
  width: 500px;
  counter-reset: list;
  list-style-type: none;
  ${MobaileSiteStyle`width:300px;`}
`;
const DisplayPrefLi = styled.li`
  display: flex;
  position: relative;
  height: 30px;
  margin: 7px 3px 7px 0;
  padding-left: 40px;
  font-weight: bold;
  font-size: 16px;
  line-height: 30px;
  border: 2px solid #00bfff;
  color: #00bfff;
  :before {
    counter-increment: list;
    content: counter(list);
    position: absolute;
    left: 0px;
    width: 30px;
    height: 30px;
    text-align: center;
    color: #fff;
    background: #00bfff;
    top: 50%;
    -webkit-transform: translateY(-50%);
  }
`;
const PrefName = styled.div`
  margin: 0 0.5em;
  width: 30%;
`;
const Population = styled.div`
  width: 70%;
`;
const InstructionText = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 4em;
  font-size: 20px;
  font-weight: bold;
`;
export default Ranking;
