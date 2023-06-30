import { Outlet } from "react-router-dom";
import styled from "styled-components";

import Nav from "../components/Nav";
import GlobalStyle from "../global-styles";

const RootLayout = () => {
  return (
    <>
      <GlobalStyle />
      <Nav />
      <MainContainer>
        <Outlet />
      </MainContainer>
    </>
  );
};

export default RootLayout;

const MainContainer = styled.div`
  padding-bottom: 40px; 
`
