import React from "react";
import classes from "./Development.module.scss";
import { PlusCircleFilled } from "@ant-design/icons";
import { useModal } from "../../../contexts/ModalContext";
import { useUserData } from "../../../contexts/UserContext";
import Login from "../../../components/modals/login/Login";
import StartDevelopmentForm from "../../../components/modals/startDevelopment/StartDevelopmentForm";
import { format } from "date-fns";
import ProgressReport from "../../../components/modals/progressReport/ProgressReport";
const Development = ({ developmentList, postID }) => {
  const { openModal } = useModal();
  const { user } = useUserData();

  const openReportsModal = (development) => {
    openModal(
      <ProgressReport
        projectID={postID}
        author={development.author}
        reports={development.reports}
        estimation={development.finishEstimation}
      />
    );
  };

  const hasSubmitted = () =>
    !developmentList
      .map((dev) => dev.author._id)
      .includes(user?.id || user?._id);

  const startDevelopment = () => {
    if (!user)
      openModal(
        <Login
          onLoginFinish={() => {
            if (hasSubmitted()) return;
            openModal(<StartDevelopmentForm id={postID} />);
          }}
        />
      );
    else openModal(<StartDevelopmentForm id={postID} />);
  };

  return (
    <div className={classes.list}>
      {hasSubmitted() ? (
        <PlusCircleFilled className={classes.add} onClick={startDevelopment} />
      ) : null}
      {developmentList.length > 0 ? (
        <div className={classes.devs}>
          {developmentList.map((dev) => (
            <div
              key={dev.id}
              className={classes.dev}
              onClick={() => openReportsModal(dev)}
            >
              <h2 className={classes.author}>{dev.author.username}</h2>
              <h3 className={classes.estimation}>
                Estimated to finish around{" "}
                {format(new Date(dev.finishEstimation), "dd.MM.yyyy.")}
              </h3>
            </div>
          ))}
        </div>
      ) : (
        <h1 className={classes.empty}>
          Nobody is developing a solution yet. Be the first one!
        </h1>
      )}
    </div>
  );
};

export default Development;
