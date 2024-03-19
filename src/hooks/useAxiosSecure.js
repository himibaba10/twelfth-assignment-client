import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "https://twelfth-assignment-server-ivory.vercel.app",
});

const useAxiosSecure = () => {
  const token = localStorage.getItem("token");
  axiosSecure.interceptors.request.use(
    (config) => {
      config.headers.token = token;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
