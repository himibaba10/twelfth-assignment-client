import { IoRocketOutline } from "react-icons/io5";
import { IoTrophyOutline } from "react-icons/io5";

import programmingImg from "../../assets/programming.jpg";

const ContestWinners = () => {
  return (
    <section className="section bg-center py-0 md:py-20 bg-fixed">
      <div
        className="text-white p-7 sm:px-12 sm:py-16 rounded-2xl bg-no-repeat bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url(${programmingImg})`,
        }}
      >
        <div className="max-w-3xl">
          <h3 className="text-4xl sm:text-5xl mb-6 sm:mb-12 font-bold">
            Join To Face The Challenge
          </h3>
          <div className="text-lg space-y-7">
            <p>
              Our contest is open to a diverse range of talents, welcoming
              everyone from designers and developers to skilled article writers.
              It is a platform where you can showcase your expertise and unleash
              your creativity.
            </p>

            <p>
              In this contest, it is not just about your existing skill set; it
              is about your ability to embrace challenges head-on. We believe in
              the power of pushing boundaries, stepping out of your comfort
              zone, and taking on new and exciting challenges.
            </p>

            <p>
              Join us on this journey of creativity, innovation, and friendly
              competition. It is not just a contest; it is a celebration of your
              skills and the thrill of overcoming challenges. Are you ready to
              take the leap and win the recognition you deserve? The challenge
              awaits – let the games begin!
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-10 mt-10">
        <div className="card shadow-xl w-full md:w-1/2 flex-row gap-5 p-7 bg-gradient-to-tr from-primary to-secondary text-white">
          <div>
            <IoRocketOutline size={40} className="mt-1" />
          </div>
          <div>
            <h2 className="card-title text-2xl sm:text-3xl font-bold">
              Get Started
            </h2>
            <p className="mt-2 mb-5 text-lg">
              Do not be late and see all the available contests
            </p>
            <button className="btn bg-white text-primary font-bold px-8 w-full mt-5 sm:mt-0 sm:w-auto border-none">
              Get Started
            </button>
          </div>
        </div>
        <div className="card shadow-xl w-full md:w-1/2 flex-row gap-5 p-7 border-4 border-secondary">
          <div>
            <IoTrophyOutline size={40} className="mt-1 text-primary" />
          </div>
          <div>
            <h2 className="card-title text-2xl sm:text-3xl font-bold">
              Winner of the recent contest
            </h2>
            <h3 className="card-title text-left sm:text-2xl font-extrabold text-primary">
              Ferdous Himel
            </h3>
            <p className="mt-5 text-lg sm:text-xl">
              <span className="font-bold">Ferdous Himel</span> is the winner of
              the Programming Contest
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContestWinners;
