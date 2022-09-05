import React from "react";
import classes from "./ProgressReport.module.scss";
import close from "../../../assets/images/close.svg";
import { useModal } from "../../../contexts/ModalContext";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../pages/router/routes";
import { useUserData } from "../../../contexts/UserContext";
import TextArea from "../../textarea/TextArea";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { getRequiredTextSchema } from "../../../utils/consts";
import { ErrorMessage, SuccessMessage } from "../../../utils/swal/messages";
import { addReport } from "../../../services/questions";
import { useQueryClient } from "react-query";

const ProgressReport = ({
  reports,
  author,
  estimation,
  projectID,
  goto = "profile",
}) => {
  const { closeModal } = useModal();
  const { user } = useUserData();
  const isOwnSolution = author._id === user?.id || author._id === user?._id;

  const navigate = useNavigate();

  const schema = yup.object({
    text: getRequiredTextSchema(3, 1000),
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema) });

  const goToProfile = () => {
    closeModal();
    goto === "profile"
      ? navigate(routes.profile.replace(":id", author._id))
      : navigate(routes.questionDetails.replace(":id", projectID));
  };

  const client = useQueryClient();

  const onSubmit = async (formData) => {
    formData.uploadDate = new Date();
    try {
      await addReport(projectID, formData);
      client.invalidateQueries("questions");
      client.invalidateQueries("user");
      closeModal();
      SuccessMessage("Progress report updated!");
    } catch (e) {
      ErrorMessage("An error occurred, please try again later");
    }
  };
  return (
    <div className={classes.modal}>
      <header className={classes.header}>
        {" "}
        <h1 className={classes.title}>Progress reports</h1>
        <img src={close} alt={""} onClick={closeModal} />
      </header>
      <h2 className={classes.author}>{author.username}</h2>
      <h3 className={classes.estimation}>
        Estimated to finish on {format(new Date(estimation), "dd.MM.yyyy.")}
      </h3>
      <main className={classes.main}>
        {reports.filter((r) => r).length > 0 ? (
          <>
            <ul className={classes.list}>
              {reports.map((report) => (
                <li className={classes.report} key={report.uploaded}>
                  <span className={classes.date}>
                    {format(new Date(report.uploaded), "dd.MM.yyyy.")} -{" "}
                  </span>
                  {report.text}
                </li>
              ))}
            </ul>
            {isOwnSolution ? (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className={classes.addReport}
              >
                <TextArea
                  className={classes.textarea}
                  placeholder={"Update progress report here"}
                  register={register("text")}
                  error={errors?.text?.message}
                />
                <button className={classes.update}>Update</button>
              </form>
            ) : null}
          </>
        ) : null}
      </main>
      <footer className={classes.footer}>
        {reports.filter((r) => r).length === 0 ? (
          <p className={classes.empty}>
            No progress reports have been posted yet.
          </p>
        ) : (
          <p></p>
        )}
        {goto === "profile" ? (
          <button className={classes.gotoProfile} onClick={goToProfile}>
            Go to profile
          </button>
        ) : (
          <button className={classes.gotoProfile} onClick={goToProfile}>
            Go to question
          </button>
        )}
      </footer>
    </div>
  );
};

export default ProgressReport;
