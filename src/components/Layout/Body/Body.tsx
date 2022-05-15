import React, { ReactNode } from "react";
import styled from "styled-components";

const Body = ({ children }: { children?: ReactNode }): JSX.Element => {
  return <Wrapper>{children}</Wrapper>;
};
const Wrapper = styled.div``;

export default Body;
