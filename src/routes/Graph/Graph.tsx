import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios, { AxiosRequestConfig, AxiosError } from "axios";
import { Pref } from "../../types/Pref";

const Graph = (): JSX.Element => {
  const [prefectureList, setPrefectureList] = useState<Array<Pref>>([]);
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
        return <>{prefecture.prefName}</>;
      })}
    </Wrapper>
  );
};
const Wrapper = styled.div``;

export default Graph;
