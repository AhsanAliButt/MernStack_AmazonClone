import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectToken } from "../../redux/slicers/authSlice";
import { selectProductsLoading } from "../../redux/slicers/productSlice";
const useStates = () => {
  const authToken = useSelector(selectToken);
  const productLoading = useSelector(selectProductsLoading);
  return { authToken, productLoading };
};

export default useStates;
