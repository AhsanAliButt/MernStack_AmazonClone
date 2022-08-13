import React, { useState, useEffect } from "react";
import "./product.css";
import productData from "../productData/productData";
import getSymbolFromCurrency from "currency-symbol-map";
import Rating from "@mui/material/Rating";

const Product = () => {
  const [product, setProduct] = useState([]);
  const [value, setValue] = useState(2);
  useEffect(() => {
    setProduct(productData);
  }, []);
  return (
    <>
      {product.map((product, key) => {
        return (
          <div className="product_container">
            <div>
              <div className="product_image">
                <img
                  src={product.image}
                  alt={product.name}
                  width={250}
                  height={300}
                />
              </div>
            </div>
            <div className="product_details">
              <div className="product_name">
                {product.name} ,{product.specs}
              </div>
              <div className="product_ratings">
                <Rating
                  name="read-only"
                  value={value}
                  readOnly
                  style={{
                    fontSize: "20px",
                  }}
                />
                ,{product.ratings}
              </div>
              <div className="product_price">
                {getSymbolFromCurrency("PKR")} {product.price}
              </div>
              <div className="product_availability">{product.stock}</div>

              <div className="product_ship">{product.ship}</div>
              <div className="product_stock">{product.stock}</div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Product;
