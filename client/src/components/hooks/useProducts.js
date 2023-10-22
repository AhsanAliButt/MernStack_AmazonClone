import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNewProduct,
  fetchProducts,
  fetchProductsByUserId,
} from "../../redux/slicers/productSlice";
import useStates from "../../components/hooks/useStates";
import { useNavigate } from "react-router-dom";

const useProducts = () => {
  const dispatch = useDispatch();
  const { authToken, user } = useStates();
  const userId = user._id;
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    name: "",
    price: "",
    userId: userId,
    description: "",
    brand: "",
    company: "",
    stock: "",
    picture: "",
    category: "",
  });

  console.log(productData);
  const addProductData = (value) => {
    setProductData((prevProductData) => ({
      ...prevProductData,
      ...value,
    }));
  };
  const createNewProduct = async () => {
    const data = {
      productData: productData,
      authToken,
    };
    console.log("Use Products", data);
    const resultAction = await dispatch(fetchNewProduct(data));
    if (
      // isLogin === true
      fetchNewProduct.fulfilled.match(resultAction)
    ) {
      // This code will run if resultAction matches the fulfilled action of loginUser
      // You can safely access resultAction.payload here
      navigate("/"); // Redirect to the last route
      console.log("Product Created successful");
    } else if (fetchNewProduct.rejected.match(resultAction)) {
      // This code will run if there was an error during authentication
      const error = resultAction.error;
      console.error("Product not Added:", error);
      // Handle the error, e.g., show an error message to the user
    }
  };
  const getMyAllProducts = async () => {
    const data = {
      userId,
      authToken,
    };
    console.log("Use Products", data);
    const resultAction = await dispatch(fetchProductsByUserId(data));
    if (
      // isLogin === true
      fetchProductsByUserId.fulfilled.match(resultAction)
    ) {
      // This code will run if resultAction matches the fulfilled action of loginUser
      // You can safely access resultAction.payload here
      // navigate("/"); // Redirect to the last route
      console.log("User Products Fetched");
    } else if (fetchProductsByUserId.rejected.match(resultAction)) {
      // This code will run if there was an error during authentication
      const error = resultAction.error;
      console.error("Products not Fetched:", error);
      // Handle the error, e.g., show an error message to the user
    }
  };
  const updateProduct = async (id) => {
    const data = {
      productData: productData,
      authToken,
      id: id,
    };
    console.log("Use Products", data);
    const resultAction = await dispatch(fetchNewProduct(data));
    if (
      // isLogin === true
      fetchNewProduct.fulfilled.match(resultAction)
    ) {
      // This code will run if resultAction matches the fulfilled action of loginUser
      // You can safely access resultAction.payload here
      navigate("/"); // Redirect to the last route
      console.log("Product Created successful");
    } else if (fetchNewProduct.rejected.match(resultAction)) {
      // This code will run if there was an error during authentication
      const error = resultAction.error;
      console.error("Product not Added:", error);
      // Handle the error, e.g., show an error message to the user
    }
  };
  return {
    createNewProduct,
    productData,
    addProductData,
    getMyAllProducts,
    updateProduct,
  };
};

export default useProducts;
