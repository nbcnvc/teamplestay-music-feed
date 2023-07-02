import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

import Nav from "../components/Nav";
import GlobalStyle from "../global-styles";
import { useEffect } from "react";
import { authApiAction } from "../redux/slices/apiSlices/authApiSlice";
import { auth } from "../services/firebase";

const RootLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(authApiAction.actionSignin());
      } else {
        dispatch(authApiAction.actionSignout());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

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
`;
