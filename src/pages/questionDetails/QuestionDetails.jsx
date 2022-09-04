import React from "react";

import classes from "./QuestionDetails.module.scss";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getOneQuestion } from "../../services/questions";
import Loader from "../../components/Loader";
import { format } from "date-fns";
import TabLayout from "../../components/layout/tabLayout/TabLayout";
import Comments from "./components/Comments";
import { fadeIn } from "../../utils/animations";
import { motion } from "framer-motion";
import { getFileLink } from "../../services/axios";
import Development from "./components/Development";

const QuestionDetails = () => {
  const { id } = useParams();
  const { data, isLoading, isError, isFetching } = useQuery(
    ["questions", id],
    () => getOneQuestion(id)
  );

  if (isLoading || isFetching) return <Loader />;
  if (isError) return <h1>An error had occurred! Please try again later.</h1>;

  const question = data.data;
  const comments = question.comments.filter((c) => !c.isSolution);
  const solutions = question.comments.filter((c) => c.isSolution);

  const tabs = [
    {
      title: `Comments (${comments.length})`,
      component: (
        <Comments
          id={id}
          key={"comments"}
          comments={question.comments.filter((c) => !c.isSolution)}
          name={"comments"}
        />
      ),
    },
    {
      title: `Solutions (${solutions.length})`,
      component: (
        <Comments
          id={id}
          key={"solutions"}
          comments={question.comments.filter((c) => c.isSolution)}
          name={"solutions"}
        />
      ),
    },
    {
      title: `In Development (${question.workingOnSolution?.length || 0})`,
      component: (
        <Development postID={id} developmentList={question.workingOnSolution} />
      ),
    },
  ];

  return (
    <motion.div {...fadeIn(1)} className={classes.page}>
      <div className={classes.layout}>
        <div className={classes.layoutLeft}>
          <header className={classes.header}>
            <h1 className={classes.title}>{question.title}</h1>
            <div className={classes.meta}>
              <span className={classes.author}>
                Posted by {question.author.username} at{" "}
                {format(new Date(question.uploaded), "dd.MM.yyyy. HH:mm")}
              </span>
              <span className={classes.views}>
                {question.viewNumber} visits
              </span>
            </div>
          </header>
          <div className={classes.mainOuter}>
            <main className={classes.main}>{question.text}</main>
          </div>
          {question.attachments.length > 0 ? (
            <footer className={classes.attachments}>
              {question.attachments.map((image, i) => (
                <img
                  key={i}
                  className={classes.image}
                  src={getFileLink(image)}
                  alt={image}
                />
              ))}
            </footer>
          ) : null}
        </div>
        <TabLayout tabs={tabs} className={classes.tabs} />
      </div>
    </motion.div>
  );
};

export default QuestionDetails;
