import { Navigate } from "react-router-dom";
import Loader from "../Components/Shared/Loader";
import useAuth from "../hooks/useAuth";
import PropTypes from "prop-types";

const CreatorRoute = ({ children }) => {
  const { loading, role, dispatchAuth, logOut } = useAuth();

  if (loading) {
    return <Loader />;
  }

  if (role !== "creator") {
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

CreatorRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CreatorRoute;
