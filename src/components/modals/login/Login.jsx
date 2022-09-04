import React from "react";
import close from "../../../assets/images/close.svg";
import { useModal } from "../../../contexts/ModalContext";
import Input from "../../input/Input";
import classes from "./Login.module.scss";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { getRequiredTextSchema, storageKeys } from "../../../utils/consts";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { ErrorMessage } from "../../../utils/swal/messages";
import { useUserData } from "../../../contexts/UserContext";
import { getCurrentUser, loginUser } from "../../../services/user";
import { routes } from "../../../pages/router/routes";
import { axiosInstance } from "../../../services/axios";
import Register from "../register/Register";

const Login = ({ onLoginFinish }) => {
  const { closeModal, openModal } = useModal();
  const navigate = useNavigate();
  const { setUser } = useUserData();
  const schema = yup.object({
    email: getRequiredTextSchema().email("This is not a valid email address"),
    password: getRequiredTextSchema(8),
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (formData) => {
    try {
      const res = await loginUser(formData);

      localStorage.setItem(storageKeys.token, res?.data?.token);
      let user = await getCurrentUser();
      setUser(user?.data);
      closeModal();
      onLoginFinish ? onLoginFinish() : navigate(routes.questions);
    } catch (e) {
      ErrorMessage("Wrong credentials!");
    }
  };

  const openRegister = () =>
    openModal(<Register onLoginFinish={onLoginFinish} />);

  return (
    <div className={classes.modal}>
      <header className={classes.header}>
        <h2 className={classes.title}>Log in</h2>
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
          label={"Password"}
          placeholder={"*******"}
          className={clsx(classes.input, classes.password)}
          type={"password"}
          error={errors?.password?.message}
          register={register("password")}
        />
        <footer className={classes.footer}>
          <p className={classes.registerHere} onClick={openRegister}>
            Don't have an account? Click here
          </p>
          <button type={"submit"} className={classes.submit}>
            Log in
          </button>
        </footer>
      </form>
    </div>
  );
};

export default Login;
