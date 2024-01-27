import { Swiper, SwiperSlide } from "swiper/react";
import "./BestContentCreator.css";

// Import Swiper styles
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import required modules
import { EffectCoverflow } from "swiper/modules";
import Heading from "../Shared/Heading";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Loader from "../Shared/Loader";

const BestContestCreator = () => {
  const axiosPublic = useAxiosPublic();
  const { data: bestCreators, isLoading } = useQuery({
    queryKey: ["bestCreators"],
    queryFn: async () => {
      const res = await axiosPublic("/creators");
      return res.data;
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="section my-10 md:my-20">
      <Heading
        title="Check Our Best Contest Creators"
        subtitle="Best creators"
      />
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        // slidesPerView={4}
        initialSlide={1}
        breakpoints={{
          1024: {
            slidesPerView: 4,
          },
          768: {
            slidesPerView: 2,
          },
          480: {
            slidesPerView: 1,
          },
        }}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        modules={[EffectCoverflow]}
        className="best-contest-creator-slider !py-16"
      >
        {bestCreators?.map((creator) => (
          <SwiperSlide key={creator._id}>
            <img className="h-80 object-cover" src={creator.image} />
            <h2 className="text-center text-2xl font-medium">{creator.name}</h2>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default BestContestCreator;
