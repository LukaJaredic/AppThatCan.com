import React, { useRef } from "react";
import clsx from "clsx";
import classes from "./FileInput.module.scss";
import close from "../../assets/images/close.svg";
import { PlusCircleOutlined } from "@ant-design/icons";

const FileInput = ({
  label,
  error,
  className,
  register,
  value,
  name,
  setValue,
  ...rest
}) => {
  const inputRef = useRef();

  return (
    <div className={clsx(classes.fieldWrapper, className)}>
      <label className={classes.label}>{label}</label>
      <input
        hidden
        type={"file"}
        {...rest}
        ref={inputRef}
        onChange={(e) => {
          if (e.target?.files?.[0]) {
            setValue(name, e.target?.files?.[0], { shouldValidate: true });
            e.target.type = "text";
            e.target.value = "";
            e.target.type = "file";
          }
        }}
      />
      {!value ? (
        <button
          type={"button"}
          onClick={() => inputRef.current?.click()}
          className={clsx(classes.input, error ? classes.error : null)}
        >
          <PlusCircleOutlined />
        </button>
      ) : (
        <div className={clsx(classes.value, error ? classes.error : null)}>
          <p className={classes.fileName}>{value.name}</p>
          <img
            load="lazy"
            src={close}
            alt=""
            className={classes.remove}
            onClick={() => setValue(name, undefined, { shouldValidate: true })}
          />
        </div>
      )}
      {error ? <p className={classes.errorMessage}>{error}</p> : null}
    </div>
  );
};

export default FileInput;
