import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross1 } from "react-icons/rx";
import { NavLink } from "react-router-dom";
import "./SideNavbar.css";
import useAuth from "../../hooks/useAuth";

const SideNavbar = () => {
  const { role } = useAuth();
  return (
    <div className="drawer lg:drawer-open side-navbar min-h-full">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center m-5 lg:hidden">
        <label
          htmlFor="my-drawer-2"
          className="drawer-button lg:hidden self-end"
        >
          <RxHamburgerMenu className="text-3xl text-primary" />
        </label>
      </div>
      <div className="drawer-side z-50">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-full lg:w-80 min-h-full bg-base-200 text-base-content text-lg">
          <li>
            <label
              htmlFor="my-drawer-2"
              className="drawer-button lg:hidden self-end"
            >
              <RxCross1 className="text-3xl text-primary" />
            </label>
          </li>
          <li>
            <NavLink to="/">Homepage</NavLink>
          </li>
          {role === "user" && (
            <>
              <li>
                <NavLink to="/dashboard/user/registered-contests">
                  My Registered Contests
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/user/winning-contests">
                  My Winning Contests
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/user/profile">My Profile</NavLink>
              </li>
            </>
          )}
          {role === "creator" && (
            <>
              <li>
                <NavLink to="/dashboard/creator/add-contest">
                  Add Contest
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/creator/created-contests">
                  My Created Contests
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/creator/submitted-contests">
                  Submitted Contest
                </NavLink>
              </li>
            </>
          )}
          {role === "admin" && (
            <>
              <li>
                <NavLink to="/dashboard/admin/manage-users">
                  Manage Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/admin/manage-contests">
                  Manage Contests
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SideNavbar;
