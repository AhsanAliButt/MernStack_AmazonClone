import React from "react";
import Product from "./Product/Product";
import Products from "./Product/Products";
import "./rightContainer.css";
import { Link } from "react-router-dom";

const RighntContaier = ({ searchQuery, category }) => {
  return (
    <div className="right_container">
      {/* <Product /> */}
      <Products searchQuery={searchQuery} category={category} />
    </div>
  );
};

export default RighntContaier;
