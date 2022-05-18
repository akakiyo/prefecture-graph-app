import React, { useState } from "react";
import styled from "styled-components";
import axios, { AxiosRequestConfig, AxiosError } from "axios";
import { DisplayPref, ResPopulationDataType } from "../../types/Pref";

type PropsType = {
  prefCode: number;
  prefName: string;
  displayPrefList: Array<DisplayPref>;
  setDisplayPrefList: React.Dispatch<React.SetStateAction<Array<DisplayPref>>>;
};
type ErrorResponse = {
  error: string;
};

const PrefCheckBox = (props: PropsType): JSX.Element => {
  const { prefCode, prefName, displayPrefList, setDisplayPrefList } = props;
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const selectPref = (): void => {
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
      <input type="checkbox" placeholder="-" onChange={() => selectPref()} />
      {prefName}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  width: 100px;
`;

export default PrefCheckBox;
