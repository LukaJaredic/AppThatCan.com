import { axiosInstance } from "./axios";

export const postQuestion = (formData) =>
  axiosInstance.post("/posts/new", {
    title: formData.title,
    text: formData.description,
  });

export const getQuestions = () => axiosInstance.get("/posts");
