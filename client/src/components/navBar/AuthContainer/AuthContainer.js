import React, { useState } from "react";
import "../NavBar.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { routes } from "../../constant/routes";
import useAuth from "../../hooks/useAuth";
const AuthContainer = ({ isLogin, user }) => {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.cart.count);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const handleFocus = () => {
    alert("Focus");
  };
  const { signOut } = useAuth();
  const handleMouseEnter = () => {
    // Add a white border when hover the mouse
    // const element = document.querySelector(".navbar_signin");
    // element.style.border = "1px solid white";
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    // Remove the white border when stop hovering
    // const element = document.querySelector(".navbar_signin");
    // element.style.border = "none";
    setShowDropdown(false);
  };

  const handleSignInButton = () => {
    navigate(routes.signIn);
  };
  const handleSignOutButton = () => {
    console.log("SignOutTriiggered"); //
    dispatch(signOut());
  };
  return (
    <>
      <Box
        className="navbar_signin"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          border: showDropdown ? "1px solid white" : "none",
        }}
        // onFocus={handleFocus}
        tabIndex="0"
      >
        <Box
          style={{
            fontSize: "14px",
          }}
        >
          Hellow, {user ? user.name : "sign in"}
        </Box>
        <Box
          style={{
            fontWeight: 700,
            fontSize: "16px",
          }}
        >
          Accounts & Lists
        </Box>
        {showDropdown && (
          <Box
            style={{
              backgroundColor: "wheat",
              color: "black",
              width: "400px",
              display: "block",
              position: "absolute",
              left: "1550.516px",
            }}
          >
            {isLogin ? (
              <Button onClick={handleSignOutButton}>SignOut</Button>
            ) : (
              <Button onClick={handleSignInButton}>SignIn</Button>
            )}

            <MenuItem>LOGIN</MenuItem>
            <MenuItem>LOGIN</MenuItem>
            <MenuItem>LOGIN</MenuItem>
            <MenuItem>LOGIN</MenuItem>
          </Box>
        )}
      </Box>
    </>
  );
};
export default AuthContainer;
