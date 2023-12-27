import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAuthLoading,
  selectCartItems,
  selectLoading,
  selectToken,
  selectUser,
} from "../../redux/slicers/authSlice";

import {
  selectProducts,
  selectProductsLoading,
  selectUserProducts,
  selectfilteredProducts,
} from "../../redux/slicers/productSlice";
const useStates = () => {
  const authToken = useSelector(selectToken);
  const authLoading = useSelector(selectAuthLoading);
  const productLoading = useSelector(selectProductsLoading);
  const user = useSelector(selectUser);
  // const userId = useSelector(selectUserId);
  const userProducts = useSelector(selectUserProducts);
  const cartAmount = useSelector((state) => state.cart.total.toFixed(2));
  const cartItems = useSelector((state) => state.cart.items);
  const allProducts = useSelector(selectProducts);
  const filteredProducts = useSelector(selectfilteredProducts);
  const userCartItems = useSelector(selectCartItems);

  return {
    authToken,
    productLoading,
    user,
    userProducts,
    cartItems,
    cartAmount,
    allProducts,
    filteredProducts,
    authLoading,
    userCartItems,
  };
};

export default useStates;
