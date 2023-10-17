import { Typography } from "@mui/material";
import React from "react";

const Header = ({ tag }) => {
  return (
    <>
      <Typography
        variant="h6"
        component="h2"
        color={"#49515A"}
        fontSize={16}
        fontFamily={"inherit"}
        fontWeight={500}
      >
        {tag}
      </Typography>
    </>
  );
};

export default Header;
