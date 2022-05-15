import React from "react";
import styled from "styled-components";
const Footer = () => {
  return (
    <Wrapper>
      <Right>© 2022 人口測る君</Right>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  bottom: 0;
  height: 100px;
  width: 100%;
  background-color: black;
`;
const Right = styled.p`
  color: #00bfff;
  text-align: center;
`;
export default Footer;
