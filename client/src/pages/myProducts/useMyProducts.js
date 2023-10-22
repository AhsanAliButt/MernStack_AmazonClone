import React from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../../components/constant/routes";

const useMyProducts = () => {
  const navigate = useNavigate();
  const handleDeleteProduct = (productId) => {};
  const handleEditProduct = (productId) => {
    navigate(`${routes.productEditForm}/${productId}`);
  };
  return { handleDeleteProduct, handleEditProduct };
};

export default useMyProducts;
