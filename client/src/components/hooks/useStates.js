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
  const userProducts = useSelector(selectUserProducts);
  return { authToken, productLoading, user, userProducts };
};

export default useStates;
