import React, { useEffect } from "react";
import MainContent from "../../components/mainContent/MainContent";
import Navbar from "../../components/navBar/Navbar";
import CheckOutPage from "../checkOutPage/CheckOutPage";
import DisplayItemPage from "../displayItemPage/DisplayItemPage";
import ProductOrderPage from "../productOrderPage/ProductOrderPage";
import "./mainPage.css";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../../redux/slicers/productSlice";
import { useSearchParams } from "react-router-dom";
import useAuth from "../../components/hooks/useAuth";

const MainPage = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { getUserByToken } = useAuth();
  const getToken = searchParams.get("token");
  // console.log("TOKEN", getToken);
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  useEffect(() => {
    if (getToken) {
      getUserByToken(getToken);
    }
  }, [getToken]);
  return (
    <>
      <MainContent />
    </>
  );
};

export default MainPage;
