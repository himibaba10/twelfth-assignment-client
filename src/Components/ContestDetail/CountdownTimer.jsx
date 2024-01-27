import Countdown from "react-countdown";
import PropTypes from "prop-types";

const CountdownTimer = ({ setRemaining, deadline }) => {
  // Renderer callback with condition

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state

      return (
        <div>
          <h2 className="text-3xl md:text-4xl text-center">
            The registration time is up!
          </h2>
        </div>
      );
    } else {
      // Render a countdown
      return (
        <div className="text-center text-xl md:text-3xl">
          <h2 className="text-3xl md:text-5xl mb-4">Time Remaining</h2>
          <span>
            {days} days {hours} Hour {minutes} Minutes {seconds} Seconds
          </span>
        </div>
      );
    }
  };

  return (
    <Countdown
      onComplete={() => setRemaining(false)}
      date={new Date(`${deadline}T00:00:00.000Z`)}
      renderer={renderer}
    />
  );
};

CountdownTimer.propTypes = {
  setRemaining: PropTypes.func.isRequired,
  deadline: PropTypes.string.isRequired,
};

export default CountdownTimer;
