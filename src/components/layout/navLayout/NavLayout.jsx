import React from "react";
import Navbar from "../../navbar/Navbar";
import classes from "./NavLayout.module.scss";

const NavLayout = ({ children }) => {
  return (
    <div className={classes.page}>
      <Navbar />
      <main className={classes.pageContent}>{children}</main>
    </div>
  );
};

export default NavLayout;
