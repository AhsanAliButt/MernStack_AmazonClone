import React from "react";
import AdvertiseFour from "../advertisefour/AdvertiseFour";
import AdvertiseOne from "../advertiseOne/AdvertiseOne";
import TopCarasol from "../topCarasol/TopCarasol";
import useMainContent from "./useMainContent";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/slicers/authSlice";

const MainContent = () => {
  const user = useSelector(selectUser);
  console.log("USER DATA", user);
  const { data } = useMainContent();
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
            <AdvertiseOne data={data} />
            <AdvertiseOne data={data} />
            <AdvertiseOne data={data} />
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
