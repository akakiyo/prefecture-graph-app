import React, { ChangeEvent } from "react";
import styled from "styled-components";
import axios, { AxiosRequestConfig, AxiosError } from "axios";
import { DisplayPref } from "../../types/Pref";

type PropsType = {
  prefCode: number;
  prefName: string;
  displayPrefList: Array<DisplayPref>;
  setDisplayPrefList: React.Dispatch<React.SetStateAction<Array<DisplayPref>>>;
};
type ErrorResponse = {
  error: string;
};
type ResData = {
  value: number;
  year: number;
};
const PrefCheckBox = (props: PropsType): JSX.Element => {
  const { prefCode, prefName, displayPrefList, setDisplayPrefList } = props;
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const getPopulationOnePrefOption: AxiosRequestConfig = {
      url: "https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear",
      method: "GET",
      headers: { "X-API-KEY": `${process.env.REACT_APP_RESAS_API_KEY}` },
      params: { prefCode: event.target.value },
    };
    axios(getPopulationOnePrefOption)
      .then((res) => {
        const values = res.data.result.data[0].data.map((data: ResData) => data["value"]);
        setDisplayPrefList([...displayPrefList, { name: prefName, data: values }]);
      })
      .catch((error: AxiosError<ErrorResponse>) => {
        console.error(error);
      });
  };

  return (
    <Wrapper>
      <input type="checkbox" placeholder="-" value={prefCode} onChange={(event) => handleChange(event)} />
      {prefName}
    </Wrapper>
  );
};
const Wrapper = styled.span``;

export default PrefCheckBox;
