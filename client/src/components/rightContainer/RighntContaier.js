import React from "react";
import Product from "./Product/Product";
import Products from "./Product/Products";
import "./rightContainer.css";
import { Link } from "react-router-dom";

const RighntContaier = (searchQuery) => {
  const exactQuery = searchQuery.searchQuery;
  console.log("RighntCont", exactQuery);
  return (
    <div className="right_container">
      {/* <Product /> */}
      <Products searchQuery={exactQuery} />
    </div>
  );
};

export default RighntContaier;
