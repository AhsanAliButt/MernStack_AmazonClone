import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

const ButtonWithLabel = ({ label, onClick, href, color, style, sx }) => {
  return (
    <Box sx={sx}>
      <Paper variant="outlined">
        <Button
          variant="contained"
          href={href}
          sx={{
            width: 220,
            marginBottom: "5px",
            borderRadius: "10px",
            height: "30px",
            fontFamily: "Roboto",
          }}
          onClick={onClick}
          style={style}
        >
          {label}
        </Button>
      </Paper>
    </Box>
  );
};

export default ButtonWithLabel;
