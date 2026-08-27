import axios from "axios";

const instance = axios.create({
  baseURL: "smart-resume-screening.up.railway.app",
  withCredentials: true,
});

export default instance;
