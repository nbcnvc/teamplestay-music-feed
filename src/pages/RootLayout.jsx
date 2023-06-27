import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";

const RootLayout = () => {
  return (
    <>
      <h2>root layout</h2>
      <Nav />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
