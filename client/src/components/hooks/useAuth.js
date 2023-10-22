import React, { useEffect, useState } from "react";
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
  const [isLogin, setIsLogin] = useState(isAuthenticated);
  useEffect(() => {
    setIsLogin(!false);
  }, [user]);

  console.log(isLogin);

  const loginHandler = async (credentials, locationPath) => {
    try {
      console.log("location", locationPath);
      // Perform authentication logic, e.g., make an API request to verify credentials
      // If authentication is successful, dispatch the loginUser action
      dispatch(setPreviousRoute(locationPath));
      const resultAction = await dispatch(loginUser(credentials));
      if (
        // isLogin === true
        loginUser.fulfilled.match(resultAction)
      ) {
        // This code will run if resultAction matches the fulfilled action of loginUser
        // You can safely access resultAction.payload here
        navigate("/"); // Redirect to the last route
        console.log("Authentication successful");
      } else if (loginUser.rejected.match(resultAction)) {
        // This code will run if there was an error during authentication
        const error = resultAction.error;
        console.error("Authentication failed:", error);
        // Handle the error, e.g., show an error message to the user
      }
    } catch (error) {
      console.error("Authentication failed:", error);
    }
  };

  const signOutUser = () => (dispatch) => {
    console.log("Signing out in UseAuth");
    // Clear the user-related data from Redux state
    dispatch(clearErrors());
    dispatch(clearUser()); //
  };

  const signUpHandler = async (credentials, locationPath) => {
    try {
      console.log("Credentials is UseAuth", credentials);
      // Perform authentication logic, e.g., make an API request to verify credentials
      // If authentication is successful, dispatch the loginUser action
      dispatch(setPreviousRoute(locationPath));
      const resultAction = await dispatch(createUser(credentials));
      if (createUser.fulfilled.match(resultAction)) {
        // This code will run if resultAction matches the fulfilled action of signUpUser
        // You can safely access resultAction.payload here
        navigate("/"); // Redirect to the last route
      } else if (createUser.rejected.match(resultAction)) {
        // This code will run if there was an error during authentication
        const error = resultAction.error;
        console.error("Authentication failed:", error);
        // Handle the error, e.g., show an error message to the user
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

  return { loginHandler, signUpHandler, checkUser, signOutUser };
};

export default useAuth;
