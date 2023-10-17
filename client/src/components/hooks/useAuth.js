import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  clearUser,
  createUser,
  loginUser,
  selectIsAuthenticated,
  selectUser,
  setPreviousRoute,
} from "../../redux/slicers/authSlice";
import { useNavigate } from "react-router-dom";
const useAuth = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const navigate = useNavigate();

  const loginHandler = async (credentials, locationPath) => {
    try {
      console.log("location", locationPath);
      // Perform authentication logic, e.g., make an API request to verify credentials
      // If authentication is successful, dispatch the loginUser action
      dispatch(setPreviousRoute(locationPath));
      const resultAction = await dispatch(loginUser(credentials));
      if (loginUser.fulfilled.match(resultAction)) {
        // This code will run if resultAction matches the fulfilled action of loginUser
        // You can safely access resultAction.payload here
        navigate("/"); // Redirect to the last route
      }
      console.log("Authentication successful");
    } catch (error) {
      console.error("Authentication failed:", error);
    }
  };

  const signOut = () => (dispatch) => {
    console.log("Signing out in UseAuth");
    // Clear the user-related data from Redux state
    dispatch(clearErrors());
    dispatch(clearUser()); //
  };

  const signUpHandler = async (credentials, locationPath) => {
    try {
      console.log("location", locationPath);
      // Perform authentication logic, e.g., make an API request to verify credentials
      // If authentication is successful, dispatch the loginUser action
      dispatch(setPreviousRoute(locationPath));
      const resultAction = await dispatch(createUser(credentials));
      if (createUser.fulfilled.match(resultAction)) {
        // This code will run if resultAction matches the fulfilled action of loginUser
        // You can safely access resultAction.payload here
        navigate("/"); // Redirect to the last route
      }
      console.log("Authentication successful");
    } catch (error) {
      console.error("Authentication failed:", error);
    }
  };

  const checkUser = async (user) => {
    try {
    } catch (error) {}
  };

  return { loginHandler, signUpHandler, checkUser, signOut };
};

export default useAuth;
