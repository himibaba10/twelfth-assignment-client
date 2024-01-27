import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Loader from "../Components/Shared/Loader";
import { Link } from "react-router-dom";
import { useState } from "react";

const Contests = () => {
  const [currentContests, setCurrentContests] = useState("All");
  const axiosPublic = useAxiosPublic();
  const { data: contests, isLoading } = useQuery({
    queryKey: ["contests", currentContests],
    queryFn: async () => {
      const res = await axiosPublic(`/contests/accepted/${currentContests}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="section">
      <div className="text-white p-7 sm:px-12 sm:py-16 rounded-2xl bg-gradient-to-tr from-primary to-secondary mb-20">
        <h3 className="text-4xl sm:text-5xl mb-5 font-bold text-center">
          All Contests
        </h3>
        <p className="text-lg text-center">
          Join a single or multiple contests from the below contests. We are
          ready to see you as a champion!
        </p>
      </div>
      <div role="tablist" className="tabs tabs-boxed w-max mx-auto mb-10">
        <a
          role="tab"
          className={`tab text-lg h-10 ${
            currentContests === "All" && "tab-active"
          }`}
          onClick={() => setCurrentContests("All")}
        >
          All
        </a>
        <a
          role="tab"
          className={`tab text-lg h-10 ${
            currentContests === "Business Contest" && "tab-active"
          }`}
          onClick={() => setCurrentContests("Business Contest")}
        >
          Business Contest
        </a>
        <a
          role="tab"
          className={`tab text-lg h-10 ${
            currentContests === "Medical Contest" && "tab-active"
          }`}
          onClick={() => setCurrentContests("Medical Contest")}
        >
          Medical Contest
        </a>
        <a
          role="tab"
          className={`tab text-lg h-10 ${
            currentContests === "Article Writing" && "tab-active"
          }`}
          onClick={() => setCurrentContests("Article Writing")}
        >
          Article Writing
        </a>
        <a
          role="tab"
          className={`tab text-lg h-10 ${
            currentContests === "Gaming" && "tab-active"
          }`}
          onClick={() => setCurrentContests("Gaming")}
        >
          Gaming
        </a>
      </div>
      {contests.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7 mb-20">
          {contests.map((contest) => (
            <div key={contest._id} className="card bg-base-100 shadow-xl">
              <figure>
                <img
                  className="h-[240px] w-full object-cover"
                  src={contest.image}
                  alt="Shoes"
                />
              </figure>
              <div className="card-body p-5">
                <h2 className="card-title">{contest.name}</h2>
                <p>{contest.description.slice(0, 150)}...</p>
                <p className="font-bold text-lg text-primary">
                  Participants: {contest.participants}
                </p>
                {new Date(contest.deadline) < new Date() && (
                  <p className="text-red-500 font-bold">
                    Registration is closed
                  </p>
                )}
                <Link
                  to={`/contests/${contest._id}`}
                  className="btn btn-primary bg-primary hover:bg-secondary text-lg mt-7 text-white font-normal"
                >
                  See Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="mb-20 text-3xl font-medium text-center">
          Contest unavailable for {currentContests}
        </p>
      )}
    </section>
  );
};

export default Contests;
