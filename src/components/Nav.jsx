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
    alert('로그아웃 했습니다.')
    dispatch(authApiAction.actionSignout())
  }

  return (
    <Container>
      <Link to="/">Teamplestay</Link>
      {isAuthenticated ? (
        <div>
          <Link to="auth/profile">🧑🏻‍👩🏻‍👧🏻profile </Link>
          <Link onClick={signoutHandler}>🔓signout</Link>
        </div>
      ) : (
        <div>
          <Link to="auth/signup">🎉signup</Link>
          <Link to="auth/signin">🔒signin</Link>
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
