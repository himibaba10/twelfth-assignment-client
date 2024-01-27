import { Navigate } from "react-router-dom";
import Loader from "../Components/Shared/Loader";
import useAuth from "../hooks/useAuth";
import PropTypes from "prop-types";

const AdminRoute = ({ children }) => {
  const { loading, role, dispatchAuth, logOut } = useAuth();

  if (loading) {
    return <Loader />;
  }

  if (role !== "admin") {
    logOut()
      .then(() => {
        Navigate("/");
      })
      .catch((err) => {
        console.log(`Error while logging out: ${err.message}`);
        dispatchAuth({
          type: "FAILURE",
          error: err.message,
        });
      });
  }

  return children;
};

AdminRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminRoute;
