import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

export const useAxiosSecure = () => {
  const { user } = useContext(AuthContext);

  const instance = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`,
  });

  // request interceptor to add Firebase token dynamically
  instance.interceptors.request.use(async (config) => {
    if (user) {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return instance;
};
