import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../../constant/routes";
import useAuth from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import useStates from "../../hooks/useStates";
import { signOutUser } from "../../../redux/slicers/authSlice";
const useAuthContainer = () => {
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const { authToken } = useStates();
  const { signOut } = useAuth();
  const handleFocus = () => {
    alert("Focus");
  };
  // const { signOutUser, signOut } = useAuth();
  const handleMouseEnter = () => {
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    setShowDropdown(false);
  };

  const handleSignInButton = () => {
    navigate(routes.signIn);
  };
  const handleCreateProduct = () => {
    console.log("Create Product");
    navigate(routes.productForm);
  };
  const handleMyProducts = () => {
    console.log("My Products");
    navigate(routes.myProducts);
  };
  const handleSignOutButton = () => {
    console.log("SignOutTriiggered"); //
    // dispatch(signOutUser());
    signOut();
  };
  const handleEditProfile = (user) => {
    const userId = user._id;
    const token = authToken;
    console.log("editProfileTriiggered", userId, authToken); //
    navigate(`/editProfile/${userId}/${token}`);
  };
  const handleChangePassword = (user) => {
    const userId = user._id;
    const token = authToken;
    console.log("editProfileTriiggered", userId, authToken); //
    navigate(`/reset-password/${userId}/${token}`);
  };
  return {
    handleMouseEnter,
    handleMouseLeave,
    handleSignInButton,
    handleCreateProduct,
    handleMyProducts,
    handleSignOutButton,
    showDropdown,
    handleEditProfile,
    handleChangePassword,
  };
};
export default useAuthContainer;
