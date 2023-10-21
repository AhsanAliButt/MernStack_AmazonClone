import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNewProduct } from "../../redux/slicers/productSlice";
import useStates from "../../components/hooks/useStates";

const useProducts = () => {
  const dispatch = useDispatch();
  const { authToken } = useStates();

  const [productData, setProductData] = useState({
    name: "",
    price: "",
    description: "",
    brand: "",
    company: "",
    stock: "",
    picture: "",
    category: "",
  });
  console.log("ProductData", productData);
  const addProductData = (value) => {
    setProductData((prevProductData) => ({
      ...prevProductData,
      ...value,
    }));
  };
  const createNewProduct = () => {
    const data = {
      productData,
      authToken,
    };
    console.log("Use Products", data);
    dispatch(fetchNewProduct(data));
  };
  return { createNewProduct, productData, addProductData };
};

export default useProducts;
