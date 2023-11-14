import React, { useEffect, useState } from "react";
import { Box, Grid, ThemeProvider, createTheme } from "@mui/material";
import useStates from "../../components/hooks/useStates";
import useProducts from "../../components/hooks/useProducts";
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
import { Link } from "react-router-dom";

const customTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 768, // Customize your breakpoints as needed
      lg: 1450,
      xl: 1980,
    },
  },
});
const MyProducts = () => {
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
    <ThemeProvider theme={customTheme}>
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
                    <Grid item key={product.category} xs={12} md={4} lg={3}>
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
                              paddingTop: "75%",
                              backgroundSize: "contain",
                            }}
                            marginTop={"10px"}
                            image={product.imageUrl}
                            title="product"
                          />
                        </Box>
                        <CardContent>
                          <Box
                            display={"flex"}
                            justifyContent={"space-between"}
                          >
                            <ButtonWithLabel
                              label="Edit Product"
                              ButtonWidth={{
                                xs: "100%",
                                sm: "60px",
                                md: "120px",
                                lg: "180px",
                              }} // Adjust the values based on your design
                              backgroundColor={"green"}
                              fontSize={{
                                xs: "0.5rem",
                                md: "0.6rem",
                                lg: "1rem",
                              }}
                              onClick={() => {
                                handleEditProduct(product._id);
                              }}
                            />
                            <ButtonWithLabel
                              label="Delete Product"
                              ButtonWidth={{
                                xs: "100%",
                                sm: "60px",
                                md: "130px",
                                lg: "180px",
                              }} // Adjust the values based on your design
                              backgroundColor={"red"}
                              fontSize={{
                                xs: "0.5rem",
                                md: "0.6rem",
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
    </ThemeProvider>
  );
};

export default MyProducts;
