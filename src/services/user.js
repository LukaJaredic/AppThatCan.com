import { axiosInstance } from "./axios";

export const getCurrentUser = () => axiosInstance.get("/getUser");
export const loginUser = (formData) => axiosInstance.post("/login", formData);
export const registerUser = (formData) =>
  axiosInstance.post("/register", formData);
