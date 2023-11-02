import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../../constant/routes";
import useAuth from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import useStates from "../../hooks/useStates";
const useAuthContainer = () => {
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const { authToken } = useStates();
  const handleFocus = () => {
    alert("Focus");
  };
  const { signOutUser } = useAuth();
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
    dispatch(signOutUser());
  };
  const handleEditProfile = (user) => {
    const userId = user._id;
    const token = authToken;
    console.log("editProfileTriiggered", userId, authToken); //
    navigate(`/editProfile/${userId}/${token}`);
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
  };
};
export default useAuthContainer;
