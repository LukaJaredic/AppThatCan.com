import React from "react";
import classes from "./QuestionCard.module.scss";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { slideIn } from "../../../../../utils/animations";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../../router/routes";

const QuestionCard = ({ question, index }) => {
  const navigate = useNavigate();

  const showDetails = () => {
    navigate(routes.questionDetails.replace(":id", question._id));
  };

  return (
    <motion.div
      {...slideIn(Math.min((index + 1) * 0.2, 4), "right")}
      className={classes.card}
      onClick={showDetails}
    >
      <h2 className={classes.title}>{question.title}</h2>
      <p className={classes.description}>{question.text}</p>
      <footer className={classes.meta}>
        <p className={classes.comments}>
          Commented {question.comments.length} times
        </p>
        <p className={classes.comments}>
          Number of posted solutions:{" "}
          {question.comments.filter((c) => c.isSolution).length}
        </p>
        <p className={classes.comments}>
          Number of users currently working on a solution:{" "}
          {question.workingOnSolution?.length || 0}
        </p>
        <p className={classes.author}>
          <span>
            Posted by {question.author.username} at{" "}
            {format(new Date(question.uploaded), "dd.MM.yyyy. HH:mm")}
          </span>
          <span>{question.viewNumber} views</span>
        </p>
      </footer>
    </motion.div>
  );
};

export default QuestionCard;
