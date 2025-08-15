import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

export const useAxiosSecure = () => {
  const { user } = useContext(AuthContext);

  const instance = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`,
    headers: user?.accessToken
      ? {
          Authorization: `Bearer ${user.accessToken}`,
        }
      : {},
  });

  return instance;
};
