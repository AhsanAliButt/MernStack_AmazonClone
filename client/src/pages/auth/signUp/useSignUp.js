import React, { useState } from "react";
const initialState = {
  firstName: "",
  lastName: "",
  name: "",
  dob: "",
  email: "",
  password: "",
  confirmPassword: "",
  gender: "",
  recoveryEmail: "",
  tc: false,
  photo: "",
  country: "",
  zipCode: "",
};

const useSignUp = () => {
  const [userDetails, setUserDetails] = useState(initialState);
  console.log("USER DETAILS", userDetails);
  const setVal = (e) => {
    // console.log(e.target.value);
    const { name, value } = e.target;

    setUserDetails(() => {
      return {
        ...userDetails,
        [name]: value,
      };
    });
  };
  return { setVal, userDetails };
};

export default useSignUp;
