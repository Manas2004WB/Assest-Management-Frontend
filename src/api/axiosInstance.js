import axios from "axios";
const useApi = () => {
  const token = localStorage.getItem("token");

  const api = axios.create({
    baseURL: "http://localhost:8000/api",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  return api;
};

export default useApi;
