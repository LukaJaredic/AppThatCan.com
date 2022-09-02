import React from "react";
import classes from "./Landing.module.scss";
import ideaPNG from "../../assets/images/landing/idea.png";
import { Link } from "react-router-dom";
import { slideIn, slideInY } from "../../utils/animations";
import { motion } from "framer-motion";
import { routes } from "../router/routes";
import { useModal } from "../../contexts/ModalContext";
import Login from "../../components/modals/login/Login";
import Register from "../../components/modals/register/Register";

const Landing = () => {
  const { openModal } = useModal();

  const openLogin = () => {
    openModal(<Login />);
  };

  const openRegister = () => {
    openModal(<Register />);
  };

  return (
    <div className={classes.page}>
      <header className={classes.header}>
        <div className={classes.grid}>
          <motion.div {...slideInY(2.5, "top")} className={classes.firstCell}>
            <h1 className={classes.title}>AppThatCan.com</h1>

            <h2 className={classes.findSolutions}>
              Find and request software solutions you need.
            </h2>
            <Link className={classes.seeSolutions} to={routes.questions}>
              See solutions
            </Link>
          </motion.div>
          <motion.img
            {...slideIn(3, "right")}
            src={ideaPNG}
            className={classes.idea}
            alt={"Idea icon"}
          />
          <motion.h2 {...slideIn(2)} className={classes.questionMark}>
            ???
          </motion.h2>
          <motion.h2
            {...slideInY(3.5, "bottom")}
            className={classes.findInspiration}
          >
            You are a developer or a software building organisation? Find
            inspiration for your projects.
            <div className={classes.accountActions}>
              <button onClick={openLogin} className={classes.login}>
                Log in
              </button>
              <button onClick={openRegister} className={classes.devRegister}>
                Create account
              </button>
            </div>
          </motion.h2>
        </div>
      </header>
    </div>
  );
};

export default Landing;
