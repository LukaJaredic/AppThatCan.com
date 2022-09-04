import React from "react";
import { Route, Routes } from "react-router-dom";
import Landing from "../landing/Landing";
import QuestionMaster from "../questionMaster/QuestionMaster";
import { routes } from "./routes";
import NavLayout from "../../components/layout/navLayout/NavLayout";
import QuestionDetails from "../questionDetails/QuestionDetails";

const Router = () => {
  return (
    <Routes>
      <Route path={routes.landing} element={<Landing />} />
      <Route
        path={routes.questions}
        element={
          <NavLayout>
            <QuestionMaster />
          </NavLayout>
        }
      />
      <Route
        path={routes.questionDetails}
        element={
          <NavLayout>
            <QuestionDetails />
          </NavLayout>
        }
      />
      <Route path={"/403"} element={<h1>403</h1>} />
      <Route path={"*"} element={<h1>404</h1>} />
    </Routes>
  );
};

export default Router;
