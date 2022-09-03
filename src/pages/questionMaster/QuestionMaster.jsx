import React, { useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/animations";
import classes from "./QuestionMaster.module.scss";
import QuestionList from "./components/questionList/QuestionList";
import Controls from "./components/controls/Controls";

const QuestionMaster = () => {
  const [filters, setFilters] = useState({});
  return (
    <motion.div {...fadeIn()} className={classes.page}>
      <Controls
        setFilters={setFilters}
        hasFilters={Object.values(filters).length > 0}
      />
      <QuestionList filters={filters} />
    </motion.div>
  );
};

export default QuestionMaster;
