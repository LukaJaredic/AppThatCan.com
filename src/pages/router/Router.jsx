import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "../landing/Landing";

const Router = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Landing />} />
      <Route path={"/403"} element={<h1>403</h1>} />
      <Route path={"*"} element={<h1>404</h1>} />
    </Routes>
  );
};

export default Router;
