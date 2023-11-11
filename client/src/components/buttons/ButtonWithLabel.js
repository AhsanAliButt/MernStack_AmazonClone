import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const ButtonWithLabel = ({
  label,
  onClick,
  href,
  color,
  style,
  sx,
  ButtonWidth,
  backgroundColor,
}) => {
  return (
    <Box>
      <Button
        variant="contained"
        href={href}
        sx={{
          width: ButtonWidth || 220,
          marginBottom: "5px",
          borderRadius: "10px",
          height: "30px",
          fontFamily: "sans-serif",
          // "&:hover": {
          //   color: "red",
          //   backgroundColor: "white",
          // },
          color: color || "white",
          background: backgroundColor || "blue",
        }}
        onClick={onClick}
        style={style}
      >
        {label}
      </Button>
    </Box>
  );
};

export default ButtonWithLabel;
