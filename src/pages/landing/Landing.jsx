import React from "react";
import classes from "./Landing.module.scss";
import ideaPNG from "../../assets/images/landing/idea.png";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className={classes.page}>
      <header className={classes.header}>
        <div className={classes.grid}>
          <div className={classes.firstCell}>
            <h1 className={classes.title}>AppThatCan.com</h1>

            <h2 className={classes.findSolutions}>
              Find and request software solutions you need.
            </h2>
            <Link className={classes.seeSolutions} to={"403"}>
              See solutions
            </Link>
          </div>
          <img src={ideaPNG} className={classes.idea} alt={"Idea icon"} />
          <h2 className={classes.questionMark}>???</h2>
          <h2 className={classes.findInspiration}>
            You are a developer or a software building organisation? Find
            inspiration for your projects.
            <Link to={"403"} className={classes.devRegister}>
              Create developer account
            </Link>
          </h2>
        </div>
      </header>
    </div>
  );
};

export default Landing;
