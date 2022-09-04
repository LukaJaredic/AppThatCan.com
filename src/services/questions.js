import { axiosInstance } from "./axios";
import { serialize } from "object-to-formdata";

export const postQuestion = (formData) =>
  axiosInstance.post(
    "/posts/new",
    serialize({
      title: formData.title,
      text: formData.description,
      attachments: formData.attachments,
    })
  );

export const getQuestions = () => axiosInstance.get("/posts");
export const getOneQuestion = (id) => axiosInstance.get(`/posts/${id}`);
export const postComment = (post, comment) =>
  axiosInstance.post(`/posts/${post}/comment`, comment);
