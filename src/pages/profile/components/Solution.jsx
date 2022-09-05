import React from "react";
import classes from "./Solution.module.scss";
import { format } from "date-fns";
import { useModal } from "../../../contexts/ModalContext";
import ProgressReport from "../../../components/modals/progressReport/ProgressReport";

const Solution = ({ solution, author }) => {
  const e = {
    _id: "6315ec63e313a1a9184c0120",
    reports: [
      { uploaded: "2022-09-05T12:32:35.978Z", text: "I WILL FINISH ON G" },
    ],
    author: "6315ea56cb7ffa591917a36d",
    finishEstimation: "2022-09-22T22:00:00.000Z",
    post: "6315ec54e313a1a9184c0112",
    __v: 0,
  };

  const { openModal } = useModal();
  const openReportModal = () => {
    openModal(
      <ProgressReport
        reports={solution.reports}
        estimation={solution.finishEstimation}
        author={author}
        projectID={solution.post}
        goto={"post"}
      />
    );
  };
  return (
    <div className={classes.solution} onClick={openReportModal}>
      <span className={classes.vision}>{solution?.reports?.[0]?.text}</span>
      <span className={classes.dates}>
        <span className={classes.started}>
          Start date:
          {solution?.reports?.[0].uploaded
            ? format(new Date(solution?.reports?.[0]?.uploaded), "dd.MM.yyyy")
            : "Unknown"}
        </span>
        <span className={classes.finish}>
          Finish estimation:
          {format(new Date(solution.finishEstimation), "dd.MM.yyyy")}
        </span>
      </span>
    </div>
  );
};

export default Solution;
