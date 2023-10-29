import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectToken, selectUser } from "../../redux/slicers/authSlice";

import {
  selectProductsLoading,
  selectUserProducts,
} from "../../redux/slicers/productSlice";
const useStates = () => {
  const authToken = useSelector(selectToken);
  const productLoading = useSelector(selectProductsLoading);
  const user = useSelector(selectUser);
  // const userId = useSelector(selectUserId);
  const userProducts = useSelector(selectUserProducts);
  const cartAmount = useSelector((state) => state.cart.total.toFixed(2));
  const cartItems = useSelector((state) => state.cart.items);

  return {
    authToken,
    productLoading,
    user,
    userProducts,
    cartItems,
    cartAmount,
  };
};

export default useStates;
