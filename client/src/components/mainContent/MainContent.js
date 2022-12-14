import React from "react";
import AdvertiseFour from "../advertisefour/AdvertiseFour";
import AdvertiseOne from "../advertiseOne/AdvertiseOne";
import TopCarasol from "../topCarasol/TopCarasol";

const MainContent = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#EAEDED",
        height: "100%",
      }}
    >
      <div className="main_page_container">
        <TopCarasol />
        <div>
          <div className="main_page_advertisement_container">
            <AdvertiseOne />
            <AdvertiseOne />
            <AdvertiseOne />
            <AdvertiseFour />
            <AdvertiseOne />
            <AdvertiseOne />
            <AdvertiseOne />
            <AdvertiseFour />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
