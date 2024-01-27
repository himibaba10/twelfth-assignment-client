import PropTypes from "prop-types";

const Heading = ({ title, subtitle }) => {
  return (
    <div className="text-center">
      <span className="font-medium text-2xl text-secondary drop-shadow-sm">
        {subtitle}
      </span>
      <h2 className="text-4xl font-bold">{title}</h2>
    </div>
  );
};

Heading.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

export default Heading;
