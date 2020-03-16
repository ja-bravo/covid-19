import { Hidden } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import React from "react";
import styled, { css } from "styled-components";

const Wrapper = styled(Container)<{ isMobile?: boolean }>`
  padding-top: 16px;
  padding-bottom: 16px;
  margin-top: 64px;
  width: initial !important;
  @media (min-width: 600px) {
    padding-top: 24px;
    padding-bottom: 24px;
  }

  @media (min-width: 960px) {
    padding-top: 32px;
    padding-bottom: 32px;
  }
`;
const Layout: React.FC<{ style?: any }> = ({ children, style }) => {
  return (
    <Wrapper maxWidth="lg" style={style}>
      {children}
    </Wrapper>
  );
};

export default Layout;
