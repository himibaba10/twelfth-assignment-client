import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import useAuth from "../../hooks/useAuth";

const Header = () => {
  const { user, logOut, dispatchAuth, role } = useAuth();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        dispatchAuth({ type: "SUCCESS", user: null });
      })
      .catch((err) => console.log(`Failed to log out ${err.message}`));
  };

  const navItems = (
    <>
      <li className="text-lg">
        <NavLink to="/">Home</NavLink>
      </li>
      <li className="text-lg">
        <NavLink to="/contests">All Contests</NavLink>
      </li>
      {user && (
        <li>
          <details>
            <summary className="after:content-[''] after:hidden">
              <img
                className="w-10 aspect-square object-cover rounded-full"
                src={user.photoURL}
                alt=""
              />
            </summary>
            <ul className="p-2 min-w-60 right-0 top-10 shadow-lg text-base">
              <li>
                <span className="!cursor-default">{user?.displayName}</span>
              </li>
              <li>
                {role === "admin" ? (
                  <Link to="/dashboard/admin">Admin Dashboard</Link>
                ) : role === "creator" ? (
                  <Link to="/dashboard/creator">Creator Dashboard</Link>
                ) : role === "user" ? (
                  <Link to="/dashboard/user">User Dashboard</Link>
                ) : null}
              </li>
              <li>
                <button onClick={handleLogOut}>Log Out</button>
              </li>
            </ul>
          </details>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar section">
      <div className="navbar-start w-full lg:w-1/2 flex-row-reverse justify-between">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 right-0"
          >
            {navItems}
          </ul>
        </div>
        <img className="w-20 md:w-24" src={logo} alt="" />
      </div>
      <div className="navbar-end w-0 lg:w-1/2">
        <ul className="menu menu-horizontal px-1 hidden lg:flex items-center">
          {navItems}
        </ul>
        {!user && (
          <Link to="login" className="btn px-5 md:px-10 min-h-0 h-auto py-3">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
