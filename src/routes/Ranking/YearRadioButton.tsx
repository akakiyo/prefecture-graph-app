import React from "react";
import styled from "styled-components";

type PropsType = {
  year: number;
  setSelectedYear: React.Dispatch<React.SetStateAction<number | undefined>>;
};

const YearRadioButton = (props: PropsType): JSX.Element => {
  const { year, setSelectedYear } = props;

  const changeSelectedYear = (): void => {
    setSelectedYear(year);
  };

  return (
    <Wrapper>
      <input type="radio" placeholder="-" name="year" onChange={() => changeSelectedYear()} />
      {year}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  width: 100px;
`;

export default YearRadioButton;
