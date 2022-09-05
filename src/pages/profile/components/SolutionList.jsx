import React from "react";
import classes from "./Solution.module.scss";
import Solution from "./Solution";

const SolutionList = ({ solutions, author }) => {
  if (solutions.length === 0) {
    return (
      <div className={classes.emptyWrapper}>
        <div className={classes.empty}>
          This user hasn't worked on any solutions.
        </div>
      </div>
    );
  }
  return (
    <div className={classes.list}>
      {solutions.map((solution) => (
        <Solution solution={solution} author={author} />
      ))}
    </div>
  );
};

export default SolutionList;
