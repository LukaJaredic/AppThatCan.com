import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/animations";
import classes from "./QuestionMaster.module.scss";

const QuestionMaster = () => {
  return (
    <motion.div {...fadeIn()} className={classes.page}>
      QuestionMaster
    </motion.div>
  );
};

export default QuestionMaster;
