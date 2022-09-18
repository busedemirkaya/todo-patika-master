import axios from "axios";

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL ="https://6321f8f3fd698dfa2903e954.mockapi.io/";
axiosInstance.defaults.timeout = 25000;
axiosInstance.defaults.headers.common["Content-Type"] = "application/json";
axiosInstance.defaults.headers.common["Accept"] = "application/json";

export default axiosInstance;