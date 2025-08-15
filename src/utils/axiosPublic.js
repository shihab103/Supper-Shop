
import axios from "axios";

export const useAxiosPublic = () => {
  const instance = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`
  });
  return instance;
};
