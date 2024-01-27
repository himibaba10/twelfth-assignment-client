import { useEffect, useState } from "react";
import useAxiosSecure from "./useAxiosSecure";

const useContest = (id) => {
  const [contest, setContest] = useState({});
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get(`/get-contest/${id}`)
      .then((res) => {
        setContest(res.data);
      })
      .catch((err) => {
        console.log(`Error getting contest ${err.message}`);
      });
  }, [axiosSecure, id]);

  return contest;
};

export default useContest;
