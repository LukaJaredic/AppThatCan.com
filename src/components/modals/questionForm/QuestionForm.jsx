import React from "react";
import classes from "./QuestionForm.module.scss";
import close from "../../../assets/images/close.svg";
import Input from "../../input/Input";
import TextArea from "../../textarea/TextArea";
import FileInput from "../../fileInput/FileInput";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { getRequiredTextSchema } from "../../../utils/consts";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage, SuccessMessage } from "../../../utils/swal/messages";
import { postQuestion } from "../../../services/questions";
import { useModal } from "../../../contexts/ModalContext";
import { useQueryClient } from "react-query";

const QuestionForm = () => {
  const schema = yup.object({
    title: getRequiredTextSchema(5, 200),
    description: getRequiredTextSchema(5, 2000),
    attachments: yup.array().test({
      message: "Unsupported file format, only pictures allowed",
      test: (val) => {
        if (val.length === 0) return true;
        for (let file of val) {
          let extension = file.name.split(".").pop();
          if (extension !== "jpg" && extension !== "png") return false;
        }
        return true;
      },
    }),
  });

  const { closeModal } = useModal();
  const client = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { attachments: [] },
  });

  const onSubmit = async (formData) => {
    try {
      await postQuestion(formData);
      client.invalidateQueries("questions");
      closeModal();
      SuccessMessage("Posted successfully!");
    } catch (e) {
      console.log(e);
      ErrorMessage("Server error...");
    }
  };

  return (
    <form className={classes.modal} onSubmit={handleSubmit(onSubmit)}>
      <header className={classes.header}>
        <h2 className={classes.title}>Post a solution request</h2>
        <img src={close} alt={""} onClick={closeModal} />
      </header>
      <main className={classes.main}>
        <Input
          register={register("title")}
          label={"Title"}
          placeholder={"We suggest inserting short form of your problem here"}
          error={errors?.title?.message}
        />
        <TextArea
          register={register("description")}
          label={"Description"}
          placeholder={"Elaborate your problem here in more detail"}
          error={errors?.description?.message}
        />
        <FileInput
          error={errors?.attachments?.message}
          maxFiles={10}
          label={"Attachments (Optional)"}
          name={"attachments"}
          setValue={setValue}
          value={watch("attachments")}
        />
      </main>
      <footer className={classes.footer}>
        <button className={classes.send}>Send</button>
      </footer>
    </form>
  );
};

export default QuestionForm;
