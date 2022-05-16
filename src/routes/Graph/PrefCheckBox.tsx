import React, { ChangeEvent, useState } from "react";
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
type ResPopulationDataType = {
  value: number;
  year: number;
};
const PrefCheckBox = (props: PropsType): JSX.Element => {
  const { prefCode, prefName, displayPrefList, setDisplayPrefList } = props;
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleChange = () => {
    if (isChecked) {
      setDisplayPrefList(displayPrefList.filter((displayPref: DisplayPref) => displayPref.name !== prefName));
      setIsChecked(!isChecked);
    } else {
      const getPopulationOnePrefOption: AxiosRequestConfig = {
        url: "https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear",
        method: "GET",
        headers: { "X-API-KEY": `${process.env.REACT_APP_RESAS_API_KEY}` },
        params: { prefCode: prefCode },
      };
      axios(getPopulationOnePrefOption)
        .then((res) => {
          const values = res.data.result.data[0].data.map((data: ResPopulationDataType) => data["value"]);
          setDisplayPrefList([...displayPrefList, { name: prefName, data: values }]);
        })
        .catch((error: AxiosError<ErrorResponse>) => {
          console.error(error);
        });
      setIsChecked(!isChecked);
    }
  };

  return (
    <Wrapper>
      <input type="checkbox" placeholder="-" onChange={() => handleChange()} />
      {prefName}
    </Wrapper>
  );
};
const Wrapper = styled.span``;

export default PrefCheckBox;
