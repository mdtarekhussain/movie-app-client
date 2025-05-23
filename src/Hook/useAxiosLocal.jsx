import axios from "axios";
import React from "react";
const localAxios = axios.create({
  // baseURL: "http://localhost:5000",
  baseURL: "https://movie-app-server-smoky.vercel.app",
});
const useAxiosLocal = () => {
  return localAxios;
};

export default useAxiosLocal;
