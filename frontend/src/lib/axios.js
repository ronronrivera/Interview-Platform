import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api`,
    withCredentials: true // by adding this field, browser will send the cookies to the server automatically on every single req
})

