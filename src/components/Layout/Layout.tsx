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
const Wrapper = styled.div``;

export default Layout;
