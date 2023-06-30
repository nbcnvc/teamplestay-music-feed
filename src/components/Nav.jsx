import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

const Nav = () => {
  const isAuthenticated = useSelector((state) => state.authApi.isAuthenticated);

  return (
    <Container>
      <Link to="/">Teamplestay</Link>
      {isAuthenticated ? (
        <div>
          <Link to="auth/profile">🧑🏻‍👩🏻‍👧🏻profile </Link>
          <Link to="auth/signout">🔓signout</Link>
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
