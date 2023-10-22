import { ArrowDropDown } from "@mui/icons-material";
import React from "react";
import InfoBar from "../../components/infoBar/InfoBar";
import LeftContainer from "../../components/leftContainer/LeftContainer";
import RighntContaier from "../../components/rightContainer/RighntContaier";
import { useSearchParams } from "react-router-dom";

import "./displayItemPage.css";

const DisplayItemPage = () => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("term");
  const category = searchParams.get("category");

  // console.log("DisplayItemSEARCHTERM", searchTerm);
  // console.log("DisplayItem Category TERM", category);
  return (
    <>
      <InfoBar />
      <div className="displayPage_container">
        <div
          style={{
            display: "flex",
          }}
        >
          <LeftContainer searchQuery={searchTerm} category={category} />
          <RighntContaier searchQuery={searchTerm} category={category} />
        </div>
      </div>
    </>
  );
};

export default DisplayItemPage;
