import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  clearUser,
  createUser,
  fetchUpdateUserDetails,
  loginUser,
  loginWithGoogle,
  resetPasssword,
  selectUser,
  sendResetPassswordEmail,
  setPreviousRoute,
  signOutUser,
} from "../../redux/slicers/authSlice";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showToast = (type, message) => {
    // Close existing toast before showing a new one
    toast.dismiss();

    // Show the new toast with a fade transition
    toast[type](message, { autoClose: 5000, transition: "fade" });
  };
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
        const successMessage = resultAction.payload.message;
        toast.success(successMessage);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else if (loginUser.rejected.match(resultAction)) {
        // This code will run if there was an error during authentication
        const error = resultAction.error.message;
        console.log("ERRORRRRRRRRR", error);
        toast.error(error);
        // Handle the error, e.g., show an error message to the user
      }
    } catch (error) {
      console.error("Authentication failed:", error);
    }
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
  const forgotPassword = async (data, locationPath) => {
    try {
      console.log("Credentials is UseAuth", data);
      // Perform authentication logic, e.g., make an API request to verify credentials
      // If authentication is successful, dispatch the loginUser action
      dispatch(setPreviousRoute(locationPath));
      const resultAction = await dispatch(resetPasssword(data));

      if (resetPasssword.fulfilled.match(resultAction)) {
        const successMessage = `${resultAction.payload.message}!`;
        toast.success(successMessage);
        setTimeout(() => {
          navigate("/signIn");
        }, 1000);
      } else if (resetPasssword.rejected.match(resultAction)) {
        // This code will run if there was an error during authentication
        const error = resultAction.error.message;
        toast.error(error);
        // Handle the error, e.g., show an error message to the user
      }
      console.log("Authentication successful");
    } catch (error) {
      console.error("Authentication failed:", error);
    }
  };
  const recoverPasswordEmail = async (email, locationPath) => {
    try {
      console.log("Credentials is UseAuth", email);
      // Perform authentication logic, e.g., make an API request to verify credentials
      // If authentication is successful, dispatch the loginUser action
      dispatch(setPreviousRoute(locationPath));
      const resultAction = await dispatch(sendResetPassswordEmail(email));

      if (sendResetPassswordEmail.fulfilled.match(resultAction)) {
        const successMessage = `${resultAction.payload.message}`;
        toast.success(successMessage);
        setTimeout(() => {
          navigate("/");
        }, 5000);
      } else if (sendResetPassswordEmail.rejected.match(resultAction)) {
        const error = resultAction.error.message;
        console.error("Authentication failed:", error);
        // Handle the error, e.g., show an error message to the user
      }
      console.log("Authentication successful");
    } catch (error) {
      console.error("Authentication failed:", error);
    }
  };

  const updateUserHandler = async (credentials, locationPath) => {
    try {
      console.log("Credentials is UseAuth", credentials);
      // Perform authentication logic, e.g., make an API request to verify credentials
      // If authentication is successful, dispatch the loginUser action
      dispatch(setPreviousRoute(locationPath));
      const resultAction = await dispatch(fetchUpdateUserDetails(credentials));
      if (fetchUpdateUserDetails.fulfilled.match(resultAction)) {
        console.log("UPDATE USER RESULT ACTION PAYLOAD", resultAction.payload);
        const successMessage = `${resultAction.payload.message}`;
        toast.success(successMessage);
        setTimeout(() => {
          // navigate("/");
        }, 5000);
        navigate("/"); // Redirect to the last route
      } else if (fetchUpdateUserDetails.rejected.match(resultAction)) {
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

  // const signOut = async (dispatch) => {
  //   console.log("useAuthSignOut");
  //   dispatch(signOutUser());
  // };
  const signOut = async (credentials, locationPath) => {
    try {
      console.log("location", locationPath);
      // Perform authentication logic, e.g., make an API request to verify credentials
      // If authentication is successful, dispatch the loginUser action
      dispatch(setPreviousRoute(locationPath));
      const resultAction = await dispatch(signOutUser());
      if (
        // isLogin === true
        signOutUser.fulfilled.match(resultAction)
      ) {
        const successMessage = resultAction.payload.message;
        toast.success(successMessage);
        setTimeout(() => {
          // navigate("/");
        }, 5000);
      } else if (signOutUser.rejected.match(resultAction)) {
        // This code will run if there was an error during authentication
        const error = resultAction.error.message;
        console.log("ERRORRRRRRRRR", error);
        toast.error(error);
        // Handle the error, e.g., show an error message to the user
      }
    } catch (error) {
      console.error("Authentication failed:", error);
    }
  };

  const handleSignInWithGoogle = () => {
    window.open("http://localhost:8001/api/user/google", "_self");
  };

  const getUserByToken = async (token) => {
    try {
      // Perform authentication logic, e.g., make an API request to verify credentials
      // If authentication is successful, dispatch the loginUser action
      const userToken = token;
      const resultAction = await dispatch(loginWithGoogle(token));
      if (
        // isLogin === true
        loginWithGoogle.fulfilled.match(resultAction)
      ) {
        const successMessage = resultAction.payload.message;
        toast.success(successMessage);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else if (loginWithGoogle.rejected.match(resultAction)) {
        // This code will run if there was an error during authentication
        const error = resultAction.error.message;
        console.log("ERRORRRRRRRRR", error);
        toast.error(error);
        // Handle the error, e.g., show an error message to the user
      }
    } catch (error) {
      console.error("Authentication failed:", error);
    }
  };
  return {
    loginHandler,
    signUpHandler,
    checkUser,
    // signOutUser,
    forgotPassword,
    recoverPasswordEmail,
    updateUserHandler,
    handleSignInWithGoogle,
    getUserByToken,
    signOut,
  };
};

export default useAuth;
