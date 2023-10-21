import { Typography } from "@mui/material";
import React from "react";

const Header = ({ tag, fontSize, fontWeight, component, variant }) => {
  return (
    <>
      <Typography
        variant={variant || "h6"}
        component={component || "h2"}
        color={"#49515A"}
        fontSize={fontSize || 16}
        fontFamily={"inherit"}
        fontWeight={fontWeight || 500}
      >
        {tag}
      </Typography>
    </>
  );
};

export default Header;
