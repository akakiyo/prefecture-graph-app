import React, { ReactNode } from "react";
import styled from "styled-components";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";

const Layout = ({ children }: { children?: ReactNode }): JSX.Element => {
  return (
    <Wrapper>
      <Header />
      <Body>{children}</Body>
      <Footer />
    </Wrapper>
  );
};
const Wrapper = styled.div`
  min-height: 100vh;
  position: relative;
  padding-bottom: 100px;
  box-sizing: border-box;
`;

export default Layout;
