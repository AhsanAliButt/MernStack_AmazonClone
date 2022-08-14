import React from "react";
import "./styles.css";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

const CheckOutItems = ({ item }) => {
  return (
    <Box>
      <Box className="checkOutItem_container">
        <Box>
          <img
            src={item.imageUrl}
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
          <Typography className="text_style">{item.description}</Typography>
          <Typography className="text_style"> {item.price}</Typography>
          <Typography className="text_style">
            {item.stock < 1 ? "Out of Stock" : "In Stock"}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default CheckOutItems;
