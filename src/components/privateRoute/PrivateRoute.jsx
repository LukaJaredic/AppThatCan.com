import React from "react";
import { storageKeys } from "../../utils/consts";
import { Navigate, NavLink, useLocation, useNavigate } from "react-router-dom";
import classes from "./PrivateRoute.module.scss";
import { logoutUser } from "../../services/user";
import { useUserData } from "../../contexts/UserContext";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, setUser } = useUserData();
  const logout = () => {
    logoutUser();
    setUser(null);
    navigate("/");
  };

  return localStorage.getItem(storageKeys.token) ? (
    <div className={classes.page}>
      <header className={classes.header}>
        <div className={classes.links}>
          <NavLink
            className={(data) =>
              data.isActive ? classes.active : classes.inactive
            }
            to={"/home"}
          >
            Home
          </NavLink>
          <NavLink
            className={(data) =>
              data.isActive ? classes.active : classes.inactive
            }
            to={"/my-books"}
          >
            My books
          </NavLink>
          <NavLink
            className={(data) =>
              data.isActive ? classes.active : classes.inactive
            }
            to={"/add-a-book"}
          >
            Add a book
          </NavLink>
          <NavLink
            className={(data) =>
              data.isActive ? classes.active : classes.inactive
            }
            to={"/favourites"}
          >
            Favourites
          </NavLink>
        </div>
        <div className={classes.rightside}>
          <div className={classes.name}>{user?.name}</div>
          <button className={classes.logout} onClick={logout}>
            Log out
          </button>
        </div>
      </header>
      <main className={classes.main} key={location.pathname}>
        {children}
      </main>
    </div>
  ) : (
    <Navigate to={"/403"} />
  );
};

export default PrivateRoute;
