import React from "react";
import "./styles.css";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

const CheckOutItems = ({}) => {
  return (
    <Box>
      <Box className="checkOutItem_container">
        <Box>
          <img
            src="https://ik.imagekit.io/amazonClone/51PuFBgBK4L._AC_UL640_FMwebp_QL65___1__V6Oa7zibX.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1660049731048"
            className="checkOutItem_img"
            alt=""
            srcset=""
            height={240}
          />
        </Box>
        <Box
          style={{
            padding: "10px",
          }}
        >
          <Typography className="text_style">
            {" "}
            New Apple i phone - 64GB
          </Typography>
          <Typography className="text_style"> 60,000</Typography>
          <Typography className="text_style"> in Stock</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default CheckOutItems;
