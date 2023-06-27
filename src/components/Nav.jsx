import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Nav = () => {
  const isAuthenticated = useSelector((state) => state.authApi.isAuthenticated);
  const removeSigninLetter = useSelector(
    (state) => state.authApi.removeSigninLetter
  );

  return (
    <>
      <div>
        {isAuthenticated ? (
          <>
            <Link to="auth/profile">profile </Link>
            <Link to="auth/signout">로그아웃</Link>
          </>
        ) : (
          <>
            <Link to="auth/signup">
              {removeSigninLetter ? "로그아웃" : "signup"}
            </Link>
            {!removeSigninLetter && <Link to="auth/signin">signin</Link>}
          </>
        )}
      </div>
    </>
  );
};

export default Nav;
