import React from "react";
import MainContent from "../../reUseAbleComponents/mainContent/MainContent";
import Navbar from "../../reUseAbleComponents/navBar/Navbar";
import DisplayItemPage from "../displayItemPage/DisplayItemPage";
import ProductOrderPage from "../productOrderPage/ProductOrderPage";
import "./mainPage.css";

const MainPage = () => {
  return (
    <>
      <Navbar />
      <MainContent />
      <DisplayItemPage />
      <ProductOrderPage />
    </>
  );
};

export default MainPage;
