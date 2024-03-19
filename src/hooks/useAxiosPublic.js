import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://twelfth-assignment-server-ivory.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
