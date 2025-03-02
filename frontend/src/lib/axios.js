import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api", 
  withCredentials: true,
});

console.log("Base URL:", axiosInstance.defaults.baseURL);


export default axiosInstance;
