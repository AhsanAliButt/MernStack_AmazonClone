import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../redux/slicers/authSlice";

const PrivateRoute = ({ element, path, redirectTo = "/signIn" }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  return isAuthenticated ? (
    <Route path={path} element={element} />
  ) : (
    <Navigate to={redirectTo} replace />
  );
};

export default PrivateRoute;
