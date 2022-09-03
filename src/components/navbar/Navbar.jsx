import React from "react";
import { NavLink } from "react-router-dom";
import { routes } from "../../pages/router/routes";
import classes from "./Navbar.module.scss";
import { useUserData } from "../../contexts/UserContext";
import clsx from "clsx";
import { useModal } from "../../contexts/ModalContext";
import Login from "../modals/login/Login";
import logo from "../../assets/images/logo.ico";

const Navbar = () => {
  const { user, setUser } = useUserData();
  const { openModal } = useModal();
  const openLogin = () => {
    openModal(<Login />);
  };
  return (
    <nav className={classes.wrapper}>
      <ul className={classes.navbar}>
        <li>
          <NavLink
            className={(state) =>
              state.isActive
                ? clsx(classes.navLink, classes.inactiveLink)
                : classes.inactiveLink
            }
            to={routes.questions}
          >
            Home
          </NavLink>
        </li>
        <li className={classes.logo} style={{ paddingLeft: user ? 123 : 30 }}>
          <img src={logo} alt={"logo"} />
        </li>
        <li className={classes.rightLinks}>
          {user ? (
            <>
              <NavLink
                className={(state) =>
                  state.isActive
                    ? clsx(classes.navLink, classes.inactiveLink)
                    : classes.inactiveLink
                }
                to={routes.myProfile}
              >
                My profile
              </NavLink>
              <button
                className={classes.logOut}
                onClick={() => {
                  setUser(null);
                  localStorage.clear();
                }}
              >
                Log out
              </button>
            </>
          ) : (
            <button className={classes.logIn} onClick={openLogin}>
              Log in
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
