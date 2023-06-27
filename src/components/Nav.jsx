import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Nav = () => {
  const isAuthenticated = useSelector((state) => state.authApi.isAuthenticated);

  return (
    <>
      <div>
        {isAuthenticated ? (
          <>
            <Link to="auth/profile">profile </Link>
            <Link to="auth/signout">signout</Link>
          </>
        ) : (
          <>
            <Link to="auth/signup">signup</Link>
            <Link to="auth/signin">signin</Link>
          </>
        )}
      </div>
    </>
  );
};

export default Nav;
