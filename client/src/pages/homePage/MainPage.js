import React, { useEffect } from "react";
import MainContent from "../../components/mainContent/MainContent";
import Navbar from "../../components/navBar/Navbar";
import CheckOutPage from "../checkOutPage/CheckOutPage";
import DisplayItemPage from "../displayItemPage/DisplayItemPage";
import ProductOrderPage from "../productOrderPage/ProductOrderPage";
import "./mainPage.css";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../../redux/slicers/productSlice";

const MainPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  return (
    <>
      <MainContent />
    </>
  );
};

export default MainPage;
