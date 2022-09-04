import React from "react";
import classes from "./ProgressReport.module.scss";
import close from "../../../assets/images/close.svg";
import { useModal } from "../../../contexts/ModalContext";
import { format } from "date-fns";

const ProgressReport = ({ reports, author, estimation }) => {
  const { closeModal } = useModal();

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
        {reports.filter((r) => r).length > 0 ? <>somereports</> : null}
      </main>
      <footer className={classes.footer}>
        {reports.filter((r) => r).length === 0 ? (
          <p className={classes.empty}>
            No progress reports have been posted yet.
          </p>
        ) : (
          <p></p>
        )}
        <button className={classes.gotoProfile}>Go to profile</button>
      </footer>
    </div>
  );
};

export default ProgressReport;
