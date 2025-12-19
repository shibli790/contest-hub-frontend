import axios from "axios";

export const saveUser = (user) => {
  const data = axios.post(`${import.meta.env.VITE_API_URL}/users`, user);
  return data;
};
