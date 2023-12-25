import React, { useState } from "react";
import useAuth from "../../../components/hooks/useAuth";
const useSignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSuccess, setShowSuccess] = useState(null);
  const [showError, setShowError] = useState(null);
  const { loginHandler, handleSignInWithGoogle } = useAuth();

  const handleSignIn = () => {
    if (!email || !password) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 6000);
    } else {
      const credentials = {
        email: email,
        password: password,
      };

      const locationPath = window.location.pathname;
      loginHandler(credentials, locationPath);
      setEmail("");
      setPassword("");
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 4000);
    }
  };
  const handleCloseAlert = () => {
    setShowError(false);
  };
  const handleSetEmail = (e) => {
    setEmail(e);
  };
  const handleSetPassword = (e) => {
    setPassword(e);
  };

  return {
    handleCloseAlert,
    handleSignIn,
    showError,
    showSuccess,
    handleSetEmail,
    handleSetPassword,
    email,
    password,
    handleSignInWithGoogle,
  };
};

export default useSignIn;
