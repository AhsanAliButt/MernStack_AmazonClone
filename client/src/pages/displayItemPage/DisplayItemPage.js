import { ArrowDropDown } from "@mui/icons-material";
import React from "react";
import InfoBar from "../../components/infoBar/InfoBar";
import LeftContainer from "../../components/leftContainer/LeftContainer";
import RighntContaier from "../../components/rightContainer/RighntContaier";

import "./displayItemPage.css";

const DisplayItemPage = () => {
  return (
    <>
      <InfoBar />
      <div className="displayPage_container">
        <div
          style={{
            display: "flex",
          }}
        >
          <LeftContainer />
          <RighntContaier />
        </div>
      </div>
    </>
  );
};

export default DisplayItemPage;
