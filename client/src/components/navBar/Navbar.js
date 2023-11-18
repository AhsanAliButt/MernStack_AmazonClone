import React, { useState } from "react";
import FooterNavbar from "../footerNavbar/footerNavbar";
import "./NavBar.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar/SearchBar";
import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import AuthContainer from "./AuthContainer/AuthContainer";
import {
  selectIsAuthenticated,
  selectUser,
} from "../../redux/slicers/authSlice";

const Navbar = () => {
  const count = useSelector((state) => state.cart.count);
  const [showDropdown, setShowDropdown] = useState(false);
  const isLogin = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);

  const handleFocus = () => {
    alert("Focus");
  };
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
  return (
    <>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box className="navbar_container">
          <Link to={"/"}>
            <Box className="navbar_logo"></Box>
          </Link>
          <Box className="navbar_locator">
            <Box className="navbar_locator_image"></Box>

            <Box
              className="navbar_location"
              sx={{
                display: {
                  xs: "none",
                  sm: "none",
                  md: "block",
                },
              }}
            >
              {" "}
              Faisalabad{" "}
            </Box>
          </Box>
          <SearchBar />
          <AuthContainer isLogin={isLogin} user={user} />

          <Box className="navbar_returns">
            <Box>
              <Typography
                fontSize={{ xs: "9px", sm: "10px", md: "12.5px", lg: "12.5px" }}
                fontWeight={"bold"}
              >
                Returns
              </Typography>
            </Box>
            <Box>
              <Typography
                fontSize={{ xs: "10px", sm: "11px", md: "13.5px", lg: "15px" }}
                fontWeight={"bold"}
              >
                & Orders
              </Typography>
            </Box>
          </Box>
          <Box className="navbar_cart">
            <Box className="navbar_cart_image"></Box>
            <Box className="navbar_cart_count">{count}</Box>
            <Box className="navbar_cart_text"> Cart</Box>
          </Box>
        </Box>
        <Box
          style={{
            marginTop: "60px",
          }}
        >
          <FooterNavbar />
        </Box>
      </Box>
    </>
  );
};

export default Navbar;
