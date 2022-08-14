import React, { useState, useEffect } from "react";
import "./product.css";
import productData from "../productData/productData";
import getSymbolFromCurrency from "currency-symbol-map";
import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";

const Product = () => {
  const [product, setProduct] = useState([]);
  const [value, setValue] = useState(2);
  useEffect(() => {
    setProduct(productData);
  }, []);
  return (
    <>
      {product.map((product, key) => {
        if (product.category === "Mobiles") {
          try {
            return (
              <>
                <Link
                  to={"/productOrderPage/" + product._id}
                  className="product_container"
                >
                  <div className="product_container">
                    <div className="product_image">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        width={250}
                        height={400}
                      />
                    </div>
                    <div className="product_details">
                      <div className="product_name">
                        {product.name} ,{product.description}
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
                      <div className="product_availability">
                        {product.stock.value == 0 ? "Out of Stock" : "In Stock"}
                      </div>

                      <div className="product_ship">{product.ship}</div>
                      <div className="product_stock">{product.stock}</div>
                    </div>
                  </div>
                </Link>
              </>
            );
          } catch (error) {
            console.log("Out Error", error);
          }
        }
      })}
    </>
  );
};

export default Product;
