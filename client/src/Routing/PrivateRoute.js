import React from "react";
import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({
  element,
  path,
  isAuthenticated,
  redirectTo = "/signIn",
}) => {
  return isAuthenticated ? (
    <Route element={element} path={path} />
  ) : (
    <Navigate to={redirectTo} />
  );
};

export default PrivateRoute;
