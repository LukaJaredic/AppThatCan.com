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

const Login = () => {
  const { closeModal } = useModal();
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
    // try {
    //   const res = await loginUser(formData);
    //   setUser(res?.data?.data?.user);
    //   localStorage.setItem(storageKeys.token, res?.data?.data?.access_token);
    //   navigate("/home");
    //   closeModal();
    // } catch (e) {
    //   ErrorMessage("Wrong credentials!");
    // }
  };

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
          <button type={"submit"} className={classes.submit}>
            Log in
          </button>
        </footer>
      </form>
    </div>
  );
};

export default Login;
