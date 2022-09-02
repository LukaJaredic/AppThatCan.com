import React from "react";
import clsx from "clsx";
import classes from "./Input.module.scss";

const Input = ({
  label,
  placeholder,
  error,
  className,
  type = "text",
  register,
  ...rest
}) => {
  return (
    <div className={clsx(classes.fieldWrapper, className)}>
      <label className={classes.label}>{label}</label>
      <input
        type={type}
        {...rest}
        {...register}
        placeholder={placeholder}
        className={clsx(classes.input, error ? classes.error : null)}
      />
      {error ? <p className={classes.errorMessage}>{error}</p> : null}
    </div>
  );
};

export default Input;
