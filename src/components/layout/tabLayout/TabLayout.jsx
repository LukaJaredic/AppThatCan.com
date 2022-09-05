import React, { useState } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";

import classes from "./TabLayout.module.scss";
import { fadeIn } from "../../../utils/animations";

const TabLayout = ({ tabs, className }) => {
  const [currentTab, setCurrentTab] = useState(
    localStorage.getItem(window?.location?.pathname)
      ? +localStorage.getItem(window?.location?.pathname)
      : 0
  );
  return (
    <div className={clsx(classes.wrapper, className)}>
      <header className={classes.header}>
        {tabs.map((t, index) => (
          <span
            key={index}
            onClick={() => {
              localStorage.setItem(window?.location?.pathname, index);
              setCurrentTab(index);
            }}
            className={clsx(
              classes.tabTitle,
              index === currentTab ? classes.current : null
            )}
          >
            {t.title}
          </span>
        ))}
      </header>
      <motion.main {...fadeIn(0.5)} key={currentTab} className={classes.main}>
        {tabs[currentTab].component}
      </motion.main>
    </div>
  );
};

export default TabLayout;
