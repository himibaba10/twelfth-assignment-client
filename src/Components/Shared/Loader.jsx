import PropTypes from "prop-types";

const Loader = ({ className }) => {
  return (
    <div className="text-center py-10">
      <span className={`loading loading-ring loading-lg ${className}`}></span>
    </div>
  );
};

Loader.propTypes = {
  className: PropTypes.string,
};

export default Loader;
