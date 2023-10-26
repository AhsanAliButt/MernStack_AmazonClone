import React from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../../components/constant/routes";
import useProducts from "../../components/hooks/useProducts";

const useMyProducts = () => {
  const navigate = useNavigate();
  const { deleteProduct } = useProducts();
  const handleDeleteProduct = (id) => {
    console.log("Product Delete Button Clicked", id);
    deleteProduct(id);
  };
  const handleEditProduct = (productId) => {
    navigate(`${routes.productEditForm}/${productId}`);
  };
  return { handleDeleteProduct, handleEditProduct };
};

export default useMyProducts;
