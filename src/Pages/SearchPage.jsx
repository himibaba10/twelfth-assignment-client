import { Link, Navigate, useLocation } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Components/Shared/Loader";
import { useState } from "react";

const SearchPage = () => {
  const location = useLocation();
  const [searchResult, setSearchResult] = useState(location.state);

  const axiosPublic = useAxiosPublic();
  const { data: contests, isLoading } = useQuery({
    enabled: searchResult ? true : false,
    queryKey: ["contests", searchResult],
    queryFn: async () => {
      const res = await axiosPublic(`/contests/search/${searchResult}`);
      return res.data;
    },
  });

  if (!location.state) {
    return <Navigate to="/" />;
  }

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchResult(e.target.search.value);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <section className="py-10 min-h-0 md:min-h-[350px] flex  items-center bg-gradient-to-tr from-primary to-secondary text-white mb-20">
        <div className="section w-full flex flex-col justify-between gap-7 items-center">
          <h1 className="text-4xl md:text-6xl font-bold text-center">
            Search Below
          </h1>
          <form className="relative w-[400px]" onSubmit={handleSearch}>
            <input
              name="search"
              type="text"
              placeholder="Search contest by tag name"
              className="mt-2 input py-7 border border-white w-full text-black"
              defaultValue={searchResult}
            />
            <button className="btn px-4 sm:px-7 shadow bg-secondary text-white absolute right-1 bottom-1">
              Search
            </button>
          </form>
        </div>
      </section>
      {contests?.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7 mb-20 section">
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
        <p className="text-center font-bold text-4xl mb-20">
          No available contest with tagname &quot;{searchResult}&quot;
        </p>
      )}
    </>
  );
};

export default SearchPage;
