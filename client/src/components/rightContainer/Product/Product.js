import React, { useState, useEffect } from "react";
import "./product.css";
import productData from "../productData/productData";
import getSymbolFromCurrency from "currency-symbol-map";
import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";

const Product = () => {
  const [product, setProduct] = useState([]);
  const [value, setValue] = useState(2);

  console.log("data", product);

  useEffect(() => {
    fetchProducts();
  }, []);

  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
  };
  const fetchProducts = async () => {
    fetch("http://localhost:8001/api/product/getAllProducts", requestOptions)
      .then((response) => response.json())
      .then((result) => setProduct(result.products))
      .catch((error) => console.log("error", error));
  };
  return (
    <>
      {product.map((product, key) => {
        if (product.category === "Mobiles") {
          try {
            return (
              <>
                {/* <Grid container spacing={2}>
                  <Grid item xs={6} md={6}>
                    xs=6 md=8
                  </Grid>
                  <Grid item xs={6} md={6}>
                    xs=6 md=4
                  </Grid>
                  <Grid item xs={6} md={6}>
                    xs=6 md=4
                  </Grid>
                  <Grid item xs={6} md={6}>
                    xs=6 md=8
                  </Grid>
                </Grid> */}
                <Link
                  to={"/productOrderPage/" + product._id}
                  className="product_container"
                >
                  <div className="product_container">
                    <div className="product_image">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        width={350}
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
                        {product.stock.value === 0
                          ? "Out of Stock"
                          : "In Stock"}
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
