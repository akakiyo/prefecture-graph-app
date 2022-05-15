import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Header = (): JSX.Element => {
  return (
    <Wrapper>
      <SiteName>人口測る君</SiteName>
      <PageTitleArea>
        <Link to="/" style={{ textDecoration: "none" }}>
          <p>グラフ</p>
        </Link>
        <Link to="/ranking" style={{ textDecoration: "none" }}>
          <p>ランキング</p>
        </Link>
      </PageTitleArea>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: 80px;
  width: 100%;
  background-color: #000000;
`;
const SiteName = styled.div`
  margin: auto auto auto 50px;
  height: 100%;
  color: #00bfff;
  font-size: 50px;
`;
const PageTitleArea = styled.div`
  display: flex;
  margin-right: 20px;
  color: #00bfff;
  p {
    margin-right: 20px;
    color: white;
    font-size: 25px;

    :hover {
      color: #00bfff;
      text-decoration: underline;
    }
  }
`;
export default Header;
