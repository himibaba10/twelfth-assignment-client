import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRegistrations = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: registrations = [],
    error,
    refetch,
  } = useQuery({
    enabled: user ? true : false,
    queryKey: ["registrations", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/registrations/${user.email}`);
      return res.data;
    },
  });

  return { registrations, error, refetch };
};

export default useRegistrations;
