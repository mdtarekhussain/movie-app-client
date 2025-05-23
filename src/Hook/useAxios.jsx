import axios from "axios";
import useAuth from "../Hook/useAuth";
import { useNavigate } from "react-router-dom";

const useAxios = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const axiosSecure = axios.create({
    // baseURL: "http://localhost:5000",
    baseURL: "https://movie-app-server-smoky.vercel.app",
  });

  axiosSecure.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token"); // <--- এটা 'token' নামের key
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosSecure.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401 || error.response?.status === 403) {
        await logout();
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxios;
