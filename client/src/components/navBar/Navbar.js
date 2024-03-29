import React, { useState } from "react";
import FooterNavbar from "../footerNavbar/footerNavbar";
import "./NavBar.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar/SearchBar";
import { Box, Typography } from "@mui/material";
import AuthContainer from "./AuthContainer/AuthContainer";
import {
  selectIsAuthenticated,
  selectUser,
} from "../../redux/slicers/authSlice";
import AMAZONICON from "../../assets/amazon-logo.png";
import LOCATIONICON from "../../assets/locationIcon.jpg";

const Navbar = () => {
  const count = useSelector((state) => state.cart.count);
  const isLogin = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);

  return (
    <>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          className="navbar_container"
          sx={{
            height: "60px",
          }}
        >
          <Link to={"/"}>
            {/* <Box className="navbar_logo"></Box> */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: {
                  xs: "2px",
                  sm: "10px",
                  md: "10px",
                },
                marginLeft: "10px",
              }}
              width={{ xs: "60px", sm: "80px", md: "100px", lg: "120px" }}
            >
              <img
                src={AMAZONICON}
                alt="Google Icon"
                style={{
                  width: "100%", // Make the image take up 100% of its container width
                  height: "auto", // Maintain the aspect ratio
                  maxWidth: "100%", // Ensure the image doesn't exceed its natural size
                }} // Adjust the width and height as needed
              />
            </Box>
          </Link>
          <Box
            className="navbar_locator"
            marginTop={{ xs: "6px", sm: "12px", md: "16px", lg: "20px" }}
            marginLeft={"4px"}
          >
            <Box
              className="navbar_locator_image"
              width={"20px"}
              height={"30px"}
            ></Box>

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
                fontSize={{ xs: "7px", sm: "8px", md: "12.5px", lg: "12.5px" }}
                fontWeight={"bold"}
              >
                Returns
              </Typography>
            </Box>
            <Box>
              <Typography
                fontSize={{ xs: "7px", sm: "7px", md: "13.5px", lg: "15px" }}
                fontWeight={"bold"}
              >
                & Orders
              </Typography>
            </Box>
          </Box>
          <Link to={"/checkOutPage"}>
            <Box className="navbar_cart">
              <Box className="navbar_cart_image"></Box>
              <Box className="navbar_cart_count">{count}</Box>
              <Box className="navbar_cart_text"> Cart</Box>
            </Box>
          </Link>
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
