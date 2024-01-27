import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Loader from "../Components/Shared/Loader";
import { useState } from "react";
import CountdownTimer from "../Components/ContestDetail/CountdownTimer";

const ContestDetail = () => {
  const [remaining, setRemaining] = useState(true);

  const { id } = useParams();
  const axiosPublic = useAxiosPublic();

  const { data: contest, isLoading } = useQuery({
    queryKey: ["contest", id],
    queryFn: async () => {
      const res = await axiosPublic(`/get-contest/${id}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  const { name, deadline, image, instruction, description, price, prizeMoney } =
    contest;

  return (
    <div className="section mb-20">
      <div className="text-white p-7 sm:px-12 sm:py-16 rounded-2xl bg-gradient-to-tr from-primary to-secondary mb-10 sm:mb-20">
        <CountdownTimer setRemaining={setRemaining} deadline={deadline} />
      </div>
      <div className="flex flex-col md:flex-row gap-10">
        <div className="w-full md:w-1/2">
          <div className="text-center">
            <p className="text-2xl sm:text-4xl font-bold mb-5 bg-gradient-to-tr from-primary to-secondary text-white py-3 rounded-md">
              Prize Money: {prizeMoney}$
            </p>
          </div>
          <img src={image} alt={`Image of ${name}`} className="w-full" />
        </div>
        <div className="w-full md:w-1/2">
          <h2 className="text-4xl sm:text-5xl mb-5 font-bold">{name}</h2>
          <p className="text-3xl font-medium mb-3">Contest Free: {price}$</p>
          <p className="text-lg text-primary font-bold">
            Participants: {contest.participants}
          </p>
          <p className="bg-gray-200 p-3 rounded my-4 font-medium shadow-inner text-red-700">
            <span className="font-bold">NOTE:</span> {instruction}
          </p>
          <p className="mt-7 text-lg">{description}</p>
          <Link
            to={`/payment/${id}`}
            className="btn bg-primary hover:bg-secondary text-white w-full sm:w-auto px-20 mt-8"
            disabled={!remaining}
          >
            {remaining ? "Register" : "Registration is closed"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContestDetail;
