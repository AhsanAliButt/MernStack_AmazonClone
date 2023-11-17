import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
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
const Products = ({ searchQuery, category }) => {
  const [value, setValue] = useState(2);
  const dispatch = useDispatch();
  const allProducts = useSelector(selectProducts);
  const filteredProducts = useSelector(selectfilteredProducts);
  const products =
    filteredProducts.length <= 0 ? allProducts : filteredProducts;

  useEffect(() => {
    if (searchQuery || category) {
      const data = { searchQuery: searchQuery, category: category };
      // Fetch searched products if searchQuery is available
      console.log("DATA BEFORE SEND TO BACKEND", data);

      dispatch(fetchProductBySearch(data));
    } else {
      dispatch(fetchProductBySearch(""));
      // dispatch(fetchProducts());
    }
  }, [searchQuery, category]);
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
      <Grid container spacing={2} padding={2}>
        <>
          {products.map((product, key) => {
            try {
              return (
                <>
                  <Grid
                    item
                    key={product.category}
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                  >
                    <Card
                      sx={{
                        padding: "10px",
                      }}
                    >
                      <Link
                        to={"/productOrderPage/" + product._id}
                        // className="product_container"
                      >
                        <Box>
                          <Typography
                            variant="h6"
                            paddingLeft={2}
                            sx={{
                              width: "auto",
                              display: "inline-block", // Allow hover effect only on text
                              "&:hover": {
                                color: "red",
                                cursor: "pointer",
                              },
                            }}
                            fontWeight="bold"
                          >
                            {product.name}
                          </Typography>
                        </Box>
                      </Link>
                      <Box padding={2}>
                        <CardMedia
                          sx={{
                            height: 0,
                            width: "auto",
                            objectFit: "cover",
                            // backgroundPosition: "left",
                            paddingTop: "45%",
                            backgroundSize: "contain",
                          }}
                          marginTop={"10px"}
                          image={product.imageUrl}
                          title="product"
                        />
                      </Box>
                      <CardContent>
                        <Box>{product.description}</Box>
                        <Box className="product_ratings">
                          <Rating
                            name="read-only"
                            value={value}
                            readOnly
                            style={{
                              fontSize: "20px",
                            }}
                          />
                          {product.ratings}
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
                      </CardContent>
                    </Card>
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
