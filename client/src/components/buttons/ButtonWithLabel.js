import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";

const ButtonWithLabel = ({
  label,
  onClick,
  href,
  color,
  style,
  sx,
  fontSize,
  ButtonWidth,
  backgroundColor,
}) => {
  return (
    <Box>
      <Button
        variant="contained"
        href={href}
        sx={{
          // width: ButtonWidth || 220,
          marginBottom: "5px",
          borderRadius: "10px",
          height: "30px",
          fontFamily: "sans-serif",
          // "&:hover": {
          //   color: "red",
          //   backgroundColor: "white",
          // },

          background: backgroundColor || "blue",
        }}
        onClick={onClick}
        style={style}
        width={ButtonWidth || 220}
      >
        <Typography color={color || "white"} fontSize={fontSize || ""}>
          {" "}
          {label}
        </Typography>
      </Button>
    </Box>
  );
};

export default ButtonWithLabel;
