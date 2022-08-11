import { ArrowDropDown } from "@mui/icons-material";
import React from "react";
import "./infoBar.css";

const InfoBar = () => {
  return (
    <div className="info_bar">
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        Results from Searched item
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        Sort by: Featured <ArrowDropDown />
      </div>
    </div>
  );
};

export default InfoBar;
