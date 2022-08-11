import { ArrowDropDown } from "@mui/icons-material";
import React from "react";
import InfoBar from "../../reUseAbleComponents/infoBar/InfoBar";
import LeftContainer from "../../reUseAbleComponents/leftContainer/LeftContainer";
import RighntContaier from "../../reUseAbleComponents/rightContainer/RighntContaier";
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
