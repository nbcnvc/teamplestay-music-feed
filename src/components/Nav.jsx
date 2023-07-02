import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

import { authApiAction } from "../redux/slices/apiSlices/authApiSlice";
import { signout } from "../services/authentication";

const Nav = () => {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.authApi.isAuthenticated);

  const signoutHandler = () => {
    signout();
    alert("로그아웃 했습니다.");
    dispatch(authApiAction.actionSignout());
  };

  return (
    <Container>
      <Link style={{ fontWeight: "bold" }} to="/">
        Teamplestay
      </Link>
      {isAuthenticated ? (
        <div>
          <Link style={{ fontWeight: "bold" }} to="auth/profile">
            ⚙️ Profile{" "}
          </Link>
          <Link style={{ fontWeight: "bold" }} onClick={signoutHandler}>
            🔓 Signout
          </Link>
        </div>
      ) : (
        <div>
          <Link style={{ fontWeight: "bold" }} to="auth/signup">
            🎉 Signup
          </Link>
          <Link style={{ fontWeight: "bold" }} to="auth/signin">
            🔒 Signin
          </Link>
        </div>
      )}
    </Container>
  );
};

export default Nav;

const Container = styled.nav`
  padding: 0 50px;

  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin: 0 auto;
  max-width: 1200px;

  & a {
    color: #fff;
  }

  & div {
    display: flex;
    gap: 30px;
  }
`;
