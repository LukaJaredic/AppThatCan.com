import React from "react";
import { Route, Routes } from "react-router-dom";
import Landing from "../landing/Landing";
import QuestionMaster from "../questionMaster/QuestionMaster";
import { routes } from "./routes";
import NavLayout from "../../components/layout/navLayout/NavLayout";
import QuestionDetails from "../questionDetails/QuestionDetails";
import Profile from "../profile/Profile";

const Router = () => {
  return (
    <Routes>
      <Route exact path={routes.landing} element={<Landing />} />
      <Route
        exact
        path={routes.questions}
        element={
          <NavLayout>
            <QuestionMaster />
          </NavLayout>
        }
      />
      <Route
        exact
        path={routes.questionDetails}
        element={
          <NavLayout>
            <QuestionDetails />
          </NavLayout>
        }
      />
      <Route
        path={routes.profile}
        exact
        element={
          <NavLayout>
            <Profile key={window.location.pathname} />
          </NavLayout>
        }
      />
      <Route path={"/403"} element={<h1>403</h1>} />
      <Route path={"*"} element={<h1>404</h1>} />
    </Routes>
  );
};

export default Router;
