import { Outlet } from "react-router-dom";
import SideNavbar from "../Components/Shared/SideNavbar";

const UserDashboard = () => {
  return (
    <div className="flex flex-col lg:flex-row">
      <div>
        <SideNavbar />
      </div>
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default UserDashboard;
