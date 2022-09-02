import React from "react";
import close from "../../../assets/images/close.svg";
import { useModal } from "../../../contexts/ModalContext";
import Input from "../../input/Input";
import classes from "../login/Login.module.scss";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { getRequiredTextSchema } from "../../../utils/consts";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage, SuccessMessage } from "../../../utils/swal/messages";
import Login from "../login/Login";

const Register = () => {
  const { closeModal, openModal } = useModal();
  const schema = yup.object({
    email: getRequiredTextSchema().email("This is not a valid email address"),
    name: getRequiredTextSchema(5),
    password: getRequiredTextSchema(8),
    "confirm-password": getRequiredTextSchema(8).test({
      message: "The passwords don't match",
      test: function (val) {
        return val === this.parent.password;
      },
    }),
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (formData) => {
    // try {
    //   await registerUser(formData);
    //   SuccessMessage("You are now registered, log in to continue!");
    //   openModal(<Login />);
    // } catch (e) {
    //   ErrorMessage("This email address is taken!");
    // }
  };

  return (
    <div className={classes.modal}>
      <header className={classes.header}>
        <h2 className={classes.title}>Register</h2>
        <img
          className={classes.close}
          src={close}
          alt=""
          onClick={closeModal}
        />
      </header>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.main}>
        <Input
          label={"Email"}
          placeholder={"Insert email"}
          className={classes.input}
          error={errors?.email?.message}
          register={register("email")}
        />
        <Input
          label={"Name"}
          placeholder={"How should we call you?"}
          className={classes.input}
          error={errors?.name?.message}
          register={register("name")}
        />
        <Input
          label={"Password"}
          placeholder={"*******"}
          className={clsx(classes.input, classes.password)}
          type={"password"}
          error={errors?.password?.message}
          register={register("password")}
        />
        <Input
          label={"Confirm password"}
          placeholder={"*******"}
          className={clsx(classes.input, classes.password)}
          type={"password"}
          error={errors?.["confirm-password"]?.message}
          register={register("confirm-password", { deps: ["password"] })}
        />
        <footer className={classes.footer}>
          <button type={"submit"} className={classes.register}>
            Register
          </button>
        </footer>
      </form>
    </div>
  );
};

export default Register;
