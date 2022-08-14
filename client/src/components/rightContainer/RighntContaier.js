import React from "react";
import Product from "./Product/Product";
import "./rightContainer.css";
import { Link } from "react-router-dom";

const RighntContaier = () => {
  return (
    <div className="right_container">
      <Product />
    </div>
  );
};

export default RighntContaier;
