import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";
import GlobalStyle from "../global-styles";

const RootLayout = () => {
  return (
    <>
      <GlobalStyle />
      <Nav />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
