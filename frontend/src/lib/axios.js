import axios from "axios";
const API_BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000/api" : "";

const axiosInstance = axios.create({
    baseURL:API_BASE_URL,
    withCredentials:true,
});

export default axiosInstance;