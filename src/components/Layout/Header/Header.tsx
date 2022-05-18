import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { slide as SideMenu } from "react-burger-menu";
import useMediaQuery from "../../../styles/useMediaQuery";

const Header = (): JSX.Element => {
  const { isMobileSite } = useMediaQuery();

  return (
    <Wrapper>
      <SiteName>人口測る君</SiteName>
      {isMobileSite ? (
        <Menu>
          <SideMenu width={250} right>
            <Link to="/" style={{ textDecoration: "none" }}>
              <p>グラフ</p>
            </Link>
            <Link to="/ranking" style={{ textDecoration: "none" }}>
              <p>ランキング</p>
            </Link>
          </SideMenu>
        </Menu>
      ) : (
        <PageTitleArea>
          <Link to="/" style={{ textDecoration: "none" }}>
            <p>グラフ</p>
          </Link>
          <Link to="/ranking" style={{ textDecoration: "none" }}>
            <p>ランキング</p>
          </Link>
        </PageTitleArea>
      )}
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
  font-size: 40px;
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
const Menu = styled.div`
  margin-left: 30px;
  .bm-burger-bars {
    background: #67c5ff;
  }
  .bm-burger-button {
    position: absolute;
    width: 36px;
    height: 30px;
    right: 30px;
    top: 30px;
  }
  .bm-burger-bars-hover {
    background: #005b99;
  }
  .bm-cross {
    background: #bdc3c7;
  }
  .bm-menu {
    background: white;
    padding: 2.5em 1.5em 0;
    font-size: 20px;
  }
  .bm-item-list {
    color: #000000;
    padding: 0.8em;
  }
  .bm-item {
    display: inline-block;
    text-decoration: none;
    outline: none;
  }
`;
export default Header;
