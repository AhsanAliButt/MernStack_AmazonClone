import React, { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import useStates from "../../components/hooks/useStates";
import useProducts from "../../components/hooks/useProducts";
import getSymbolFromCurrency from "currency-symbol-map";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardMedia,
} from "@mui/material";
import "./myProducts.css";
import useMyProducts from "./useMyProducts";
import ButtonWithLabel from "../../components/buttons/ButtonWithLabel";
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
      <Grid container spacing={[4, 2, 2]}>
        <>
          {userProducts.map((product, key) => {
            try {
              return (
                <>
                  {/* <Grid item key={product.category} xs={12} md={6} lg={2}>
                    <Box
                    //   className="product_container"
                    // style={{
                    //   width: "fit-content",
                    // }}
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
                              width={250}
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
                  </Grid> */}

                  <Grid item key={product.category} xs={12} md={4} lg={3}>
                    <Card
                      sx={{
                        padding: "10px",
                      }}
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
                          {product.category}
                        </Typography>
                      </Box>
                      <Box padding={2}>
                        <CardMedia
                          sx={{
                            height: 0,
                            width: "auto",
                            objectFit: "cover",
                            paddingTop: "75%",
                            backgroundSize: "contain",
                          }}
                          marginTop={"10px"}
                          image={product.imageUrl}
                          title="product"
                        />
                      </Box>
                      <CardContent>
                        <Box display={"flex"} justifyContent={"space-between"}>
                          <ButtonWithLabel
                            label="Edit Product"
                            ButtonWidth={{ xs: "100%", sm: "60px" }} // Adjust the values based on your design
                            backgroundColor={"green"}
                            fontSize={{
                              xs: "0.5rem",
                              md: "0.7rem",
                              lg: "1rem",
                            }}
                            onClick={() => {
                              handleEditProduct(product._id);
                            }}
                          />
                          <ButtonWithLabel
                            label="Delete Product"
                            ButtonWidth={{ xs: "100%", sm: "60px" }} // Adjust the values based on your design
                            backgroundColor={"red"}
                            fontSize={{
                              xs: "0.5rem",
                              md: "0.7rem",
                              lg: "1rem",
                            }}
                            onClick={() => {
                              handleDeleteProduct(product._id);
                            }}
                          />
                        </Box>
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

export default MyProducts;
