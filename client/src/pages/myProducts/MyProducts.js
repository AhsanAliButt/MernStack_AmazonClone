import React, { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import useStates from "../../components/hooks/useStates";
import useProducts from "../../components/hooks/useProducts";
import getSymbolFromCurrency from "currency-symbol-map";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "./myProducts.css";
import useMyProducts from "./useMyProducts";
const MyProducts = () => {
  const [value, setValue] = useState(2);
  const { userProducts } = useStates();
  const { getMyAllProducts } = useProducts();
  const { handleDeleteProduct, handleEditProduct } = useMyProducts();
  useEffect(() => {
    getMyAllProducts();
    return;
  }, []);
  useEffect(() => {
    console.log("My Products", userProducts);
  }, [useProducts]);

  return (
    <Box
      style={{
        backgroundColor: "blue",
        padding: "30px",
      }}
    >
      <Grid container spacing={4}>
        <>
          {userProducts.map((product, key) => {
            try {
              return (
                <>
                  <Grid item xs={2} md={3}>
                    <Box
                      //   className="product_container"
                      style={{
                        width: "fit-content",
                      }}
                    >
                      <Box
                        className="product_image"
                        style={{
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        {" "}
                        <Link
                          to={"/productOrderPage/" + product._id}
                          //   className="product_container"
                        >
                          <Box>
                            <img
                              src={product.imageUrl}
                              alt={product.name}
                              width={300}
                              height={250}
                            />
                          </Box>
                        </Link>
                        <Box
                          style={{
                            display: "flex",
                          }}
                        >
                          <Box>
                            <DeleteIcon
                              style={{ cursor: "pointer", color: "red" }}
                              onClick={() => handleDeleteProduct(product._id)} // Replace with your delete function
                            />
                          </Box>

                          <Box marginLeft={1}>
                            <EditIcon
                              style={{ cursor: "pointer", color: "green" }}
                              onClick={() => handleEditProduct(product._id)} // Replace with your edit function
                            />
                          </Box>
                        </Box>
                      </Box>
                      <Link
                        to={"/productOrderPage/" + product._id}
                        //   className="product_container"
                      >
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
                      </Link>
                    </Box>
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

export default MyProducts;
