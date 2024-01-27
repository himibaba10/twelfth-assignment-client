import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useContests = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const token = localStorage.getItem("token");

  const {
    data: contests = [],
    error,
    refetch,
  } = useQuery({
    enabled: user && token ? true : false,
    queryKey: ["contests"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contests/${user.email}`);
      return res.data;
    },
  });

  return { contests, error, refetch };
};

export default useContests;
