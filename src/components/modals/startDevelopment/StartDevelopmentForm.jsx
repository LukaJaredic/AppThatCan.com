import React from "react";
import classes from "./StartDevelopment.module.scss";
import close from "../../../assets/images/close.svg";
import DateInput from "../../dateInput/DateInput";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useModal } from "../../../contexts/ModalContext";
import { ErrorMessage } from "../../../utils/swal/messages";
import { startWorkingOnSolution } from "../../../services/questions";
import { useParams } from "react-router-dom";
import { useQueryClient } from "react-query";
import TextArea from "../../textarea/TextArea";
import { getRequiredTextSchema } from "../../../utils/consts";

const StartDevelopmentForm = ({ id }) => {
  const { closeModal } = useModal();
  const schema = yup.object({
    date: yup
      .date()
      .required("Field required")
      .min(new Date(), "Field invalid"),
    text: getRequiredTextSchema(3, 1000),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { date: new Date() },
  });

  const client = useQueryClient();

  const onSubmit = async (formData) => {
    try {
      formData.uploadDate = new Date();
      await startWorkingOnSolution(id, formData);
      client.invalidateQueries("questions");
      closeModal();
    } catch (e) {
      ErrorMessage("An error occurred, please try again later.");
    }
  };
  return (
    <form className={classes.modal} onSubmit={handleSubmit(onSubmit)}>
      <header className={classes.header}>
        <h1 className={classes.title}>Start developing a solution</h1>
        <img src={close} alt="" onClick={closeModal} />
      </header>
      <main className={classes.main}>
        <DateInput
          label={"Estimated date of development end"}
          register={register("date")}
          error={errors?.date?.message}
        />
        <TextArea
          register={register("text")}
          label={"Initial report"}
          placeholder={
            "Insert a short vision of software solution you will build"
          }
          error={errors?.text?.message}
        />
      </main>
      <footer className={classes.footer}>
        <button className={classes.submit}>Submit</button>
      </footer>
    </form>
  );
};

export default StartDevelopmentForm;
