import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import getSymbolFromCurrency from "currency-symbol-map";
import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  selectProducts,
  selectfilteredProducts,
  fetchProductBySearch,
} from "../../../redux/slicers/productSlice";
const Products = ({ searchQuery }) => {
  const [value, setValue] = useState(2);
  const dispatch = useDispatch();
  console.log("SearhQueryInProducts.js", searchQuery);
  const allProducts = useSelector(selectProducts);
  const filteredProducts = useSelector(selectfilteredProducts);

  const products = filteredProducts || allProducts;

  useEffect(() => {
    if (searchQuery) {
      // Fetch searched products if searchQuery is available

      dispatch(fetchProductBySearch(searchQuery));
    } else {
      dispatch(fetchProductBySearch(""));
      dispatch(fetchProducts());
    }
  }, [searchQuery]);
  // useEffect(() => {
  //   if (!searchQuery) {
  //     // Fetch searched products if searchQuery is available

  //     dispatch(fetchProductBySearch(searchQuery));
  //   } else {
  //     dispatch(fetchProductBySearch(""));
  //     dispatch(fetchProducts());
  //   }
  // }, [searchQuery]);

  return (
    <Box>
      <Grid container spacing={2}>
        <>
          {products.map((product, key) => {
            try {
              return (
                <>
                  <Grid item xs={3} md={3}>
                    <Link
                      to={"/productOrderPage/" + product._id}
                      // className="product_container"
                    >
                      <Box
                      // className="product_container"
                      >
                        <Box className="product_image">
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            width={200}
                            height={250}
                          />
                        </Box>
                        <Box className="product_details">
                          <Box className="product_name">{product.name}</Box>
                          <Box className="product_ratings">
                            <Rating
                              name="read-only"
                              value={value}
                              readOnly
                              style={{
                                fontSize: "20px",
                              }}
                            />
                            ,{product.ratings}
                          </Box>
                          <Box className="product_price">
                            {getSymbolFromCurrency("PKR")} {product.price}
                          </Box>
                          <Box className="product_availability">
                            {product.stock.value === 0
                              ? "Out of Stock"
                              : "In Stock"}
                          </Box>

                          <Box className="product_ship">{product.ship}</Box>
                          <Box className="product_stock">{product.stock}</Box>
                        </Box>
                      </Box>
                    </Link>
                  </Grid>
                </>
              );
            } catch (error) {
              console.log("Out Error", error);
            }
          })}
        </>
      </Grid>
    </Box>
  );
};

export default Products;