import {axiosInstance} from "./axios";

export const getCurrentUser = () => axiosInstance.get("/user");