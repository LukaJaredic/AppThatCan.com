import React from "react";
import classes from "./Comments.module.scss";
import TextArea from "../../../components/textarea/TextArea";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { getRequiredTextSchema } from "../../../utils/consts";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUserData } from "../../../contexts/UserContext";
import Login from "../../../components/modals/login/Login";
import { useModal } from "../../../contexts/ModalContext";
import { ErrorMessage } from "../../../utils/swal/messages";
import { postComment } from "../../../services/questions";
import { useQueryClient } from "react-query";
import { format } from "date-fns";

const Comments = ({ comments, name = "Comments", id }) => {
  const { user } = useUserData();
  const { openModal } = useModal();
  const schema = yup.object({
    text: getRequiredTextSchema(3, 500),
  });
  const client = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (formData) => {
    if (!user) return openModal(<Login onLoginFinish={post} />);

    async function post() {
      try {
        await postComment(id, {
          ...formData,
          isSolution: name === "solutions",
        });
        reset();
        client.invalidateQueries("questions");
      } catch (e) {
        ErrorMessage("Sorry, something went wrong. Try again later please.");
      }
    }
  };

  const CommentInput = (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.input}>
      <TextArea
        error={errors?.text?.message}
        placeholder={`Post your ${name} here`}
        register={register("text")}
        className={classes.textarea}
      />
      <button className={classes.submit}>Post</button>
    </form>
  );

  if (comments.length === 0)
    return (
      <div>
        {CommentInput}
        <h1 className={classes.empty}>No {name}. Be the first one to post!</h1>
      </div>
    );
  return (
    <div className={classes.commentList}>
      {CommentInput}
      {comments
        .sort((a, b) => b.uploaded.localeCompare(a.uploaded))
        .map((comment) => (
          <div className={classes.comment} key={comment._id}>
            <h3 className={classes.author}>{comment.author}</h3>
            <p className={classes.date}>
              {format(new Date(comment.uploaded), "dd.MM.yyyy. HH:mm")}
            </p>
            <p className={classes.commentText}>{comment.text}</p>
          </div>
        ))}
    </div>
  );
};

export default Comments;
