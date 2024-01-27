import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useRegisteredContests = (user, sort) => {
  const axiosSecure = useAxiosSecure();
  const {
    data: contests,
    isLoading,
    refetch,
  } = useQuery({
    enabled: user ? true : false,
    queryKey: ["contests", user?.email, sort],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/registered-contests/${user.email}?sort=${sort}`
      );
      return res.data;
    },
  });

  return { contests, isLoading, refetch };
};

export default useRegisteredContests;
