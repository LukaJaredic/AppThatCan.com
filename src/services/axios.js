import axios from "axios";
import { storageKeys } from "../utils/consts";

export const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:3000/api",
});

axiosInstance.interceptors.request.use(
  function (config) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${localStorage.getItem(storageKeys.token)}`,
      Accept: "application/json",
    };
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
