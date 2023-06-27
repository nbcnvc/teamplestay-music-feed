import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Nav = () => {
  const isAuthenticated = useSelector(state => state.authApi.isAuthenticated)

  return (
    <>
      <div>
        {isAuthenticated ? '로그아웃' : <Link to='auth/signup'>signup</Link>}
        <Link to='auth/profile'>profile</Link>
      </div>
    </>
  );
};

export default Nav;
