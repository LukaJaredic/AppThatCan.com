import React from "react";
import classes from "./QuestionList.module.scss";
import { PlusCircleFilled } from "@ant-design/icons";
import { useUserData } from "../../../../contexts/UserContext";
import { useModal } from "../../../../contexts/ModalContext";
import Login from "../../../../components/modals/login/Login";
import QuestionForm from "../../../../components/modals/questionForm/QuestionForm";
import { useQuery } from "react-query";
import { getQuestions } from "../../../../services/questions";
import Loader from "../../../../components/Loader";
import QuestionCard from "./components/QuestionCard";
import { filterQuestions } from "./utils/filter";
import { fadeIn } from "../../../../utils/animations";
import { motion } from "framer-motion";

const QuestionList = ({ filters }) => {
  const { user } = useUserData();
  const { openModal } = useModal();
  const { data, isFetching, isError, isLoading } = useQuery(
    ["questions"],
    getQuestions,
    {
      cacheTime: 100000,
      staleTime: 100000,
    }
  );

  const questions = data?.data || [];

  const checkUserAndProceed = () => {
    if (user) openModal(<QuestionForm />);
    else openModal(<Login onLoginFinish={() => openModal(<QuestionForm />)} />);
  };

  if (isFetching || isLoading) return <Loader />;

  if (isError) return <h1>Server error has occurred!</h1>;

  let filteredQuestions;
  if (Boolean(Object.values(filters)))
    filteredQuestions = filterQuestions(questions, filters);
  else filteredQuestions = questions;

  return (
    <div className={classes.wrapper}>
      <PlusCircleFilled className={classes.add} onClick={checkUserAndProceed} />
      <div>
        {filteredQuestions.length > 0 ? (
          filteredQuestions
            .sort((a, b) => b.viewNumber - a.viewNumber)
            .map((question, index) => (
              <QuestionCard
                key={question._id}
                question={question}
                index={index}
              />
            ))
        ) : (
          <motion.div {...fadeIn(1)} className={classes.emptyWrapper}>
            <div className={classes.empty}>
              <motion.div {...fadeIn(2)}>
                No results match given parameters :(
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default QuestionList;
