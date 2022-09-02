import React from "react";
import clsx from "clsx";
import classes from "./TextArea.module.scss";

const TextArea = ({
  label,
  placeholder,
  error,
  className,
  register,
  ...rest
}) => {
  return (
    <div className={clsx(classes.fieldWrapper, className)}>
      <label className={classes.label}>{label}</label>
      <textarea
        {...rest}
        {...register}
        placeholder={placeholder}
        className={clsx(classes.input, error ? classes.error : null)}
      />
      {error ? <p className={classes.errorMessage}>{error}</p> : null}
    </div>
  );
};

export default TextArea;
