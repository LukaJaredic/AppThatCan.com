import React, { useRef } from "react";
import classes from "./DateInput.module.scss";
import clsx from "clsx";

const DateInput = ({
  label,
  placeholder,
  register,
  error,
  className,
  ...rest
}) => {
  const ref = useRef();
  return (
    <div className={clsx(classes.fieldWrapper, className)}>
      <label className={classes.label}>{label}</label>
      <input
        ref={ref}
        onClick={(e) => {
          e.target.showPicker();
        }}
        type={"date"}
        {...rest}
        {...register}
        placeholder={placeholder}
        className={clsx(classes.input, error ? classes.error : null)}
        min={new Date()}
      />
      {error ? <p className={classes.errorMessage}>{error}</p> : null}
    </div>
  );
};

export default DateInput;
