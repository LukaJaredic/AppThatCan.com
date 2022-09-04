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
  maxFiles = 1,
  ...rest
}) => {
  const inputRef = useRef();

  return (
    <div className={clsx(classes.fieldWrapper, className)}>
      <label className={classes.label}>{label}</label>
      <input
        hidden
        accept={".jpg, .png"}
        type={"file"}
        {...rest}
        ref={inputRef}
        onChange={(e) => {
          if (e.target?.files?.[0]) {
            if (
              !value
                .map((file) => file.name)
                .includes(e.target?.files?.[0].name)
            )
              setValue(name, [...value, e.target?.files?.[0]], {
                shouldValidate: true,
              });
            e.target.type = "text";
            e.target.value = "";
            e.target.type = "file";
          }
        }}
      />
      {value.length > 0
        ? value.map((file) => (
            <div className={clsx(classes.value, error ? classes.error : null)}>
              <p className={classes.fileName}>{file.name}</p>
              <img
                src={close}
                alt=""
                className={classes.remove}
                onClick={() =>
                  setValue(
                    name,
                    value.filter((f) => f.name !== file.name),
                    { shouldValidate: true }
                  )
                }
              />
            </div>
          ))
        : null}
      {value.length < maxFiles ? (
        <button
          type={"button"}
          onClick={() => inputRef.current?.click()}
          className={clsx(classes.input, error ? classes.error : null)}
        >
          <PlusCircleOutlined />
        </button>
      ) : null}
      {error ? <p className={classes.errorMessage}>{error}</p> : null}
    </div>
  );
};

export default FileInput;
