import React from "react";
import classes from "./QuestionList.module.scss";
import { PlusCircleFilled } from "@ant-design/icons";
import { useUserData } from "../../../../contexts/UserContext";
import { useModal } from "../../../../contexts/ModalContext";
import Login from "../../../../components/modals/login/Login";

const QuestionList = ({ filters }) => {
  const { user } = useUserData();
  const { openModal } = useModal();

  const checkUserAndProceed = () => {
    if (user) openModal(<>add</>);
    else openModal(<Login onLoginFinish={() => openModal(<>ADD</>)} />);
  };
  return (
    <div className={classes.wrapper}>
      <div className={classes.addWrapper}>
        <PlusCircleFilled
          className={classes.add}
          onClick={checkUserAndProceed}
        />
      </div>
      <div style={{ width: "100%", height: 9000 }}></div>
    </div>
  );
};

export default QuestionList;
