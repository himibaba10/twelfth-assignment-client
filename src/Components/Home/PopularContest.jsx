import "./PopularContest.css";
import Heading from "../Shared/Heading";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Loader from "../Shared/Loader";
import { Link } from "react-router-dom";

const PopularContest = () => {
  const axiosPublic = useAxiosPublic();
  const { data: popularContests, isLoading } = useQuery({
    queryKey: ["popularContests"],
    queryFn: async () => {
      const res = await axiosPublic("/contests/popular");
      return res.data;
    },
  });

  return (
    <section className="section my-10 md:my-20">
      <Heading
        title="Our Popular Contests So Far"
        subtitle="Popular contests"
      />
      {isLoading ? (
        <Loader />
      ) : (
        <Swiper
          // slidesPerView={2}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
          }}
          className="popular-contest-pagination !pb-14 mt-8 md:mt-16"
        >
          {popularContests.map((contest) => (
            <SwiperSlide key={contest._id}>
              <div className="card flex-col sm:flex-row shadow-lg overflow-hidden">
                <figure className="rounded-none">
                  <img
                    className="h-64 w-full sm:w-40 object-cover"
                    src={contest.image}
                    alt={`Image of ${contest.name}`}
                  />
                </figure>
                <div className="card-body p-4 sm:p-7 text-center items-center sm:text-left sm:items-start">
                  <h2 className="card-title">{contest.name}</h2>
                  <p className="grow-0">
                    {contest.description.slice(0, 90)}...
                  </p>
                  <p className="text-secondary font-medium grow-0">
                    Attempted count: {contest.participants}
                  </p>
                  <div className="card-actions w-full justify-end mt-auto">
                    <Link
                      to={`/contests/${contest._id}`}
                      className="btn bg-secondary text-white px-8 w-full mt-5 sm:mt-0 sm:w-auto"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
};
export default PopularContest;
