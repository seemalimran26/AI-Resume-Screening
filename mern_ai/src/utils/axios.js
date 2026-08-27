import axios from "axios";

const instance = axios.create({
  baseURL: "https://independent-gentleness-production-6762.up.railway.app/",
  withCredentials: true,
});

export default instance;
