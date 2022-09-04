import { axiosInstance } from "./axios";

export const postQuestion = (formData) =>
  axiosInstance.post("/posts/new", {
    title: formData.title,
    text: formData.description,
  });

export const getQuestions = () => axiosInstance.get("/posts");
export const getOneQuestion = (id) => axiosInstance.get(`/posts/${id}`);
export const postComment = (post, comment) =>
  axiosInstance.post(`/posts/${post}/comment`, comment);
