import React, { useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  CardMedia,
  Box,
} from "@mui/material";
import AdvertiseFour from "../advertisefour/AdvertiseFour";
import TopCarasol from "../topCarasol/TopCarasol";
import useStates from "../hooks/useStates";
import AdvertiseOne from "../advertiseOne/AdvertiseOne";
import { useNavigate } from "react-router-dom";
import FeedCarsol from "../feedCarsol/FeedCarsol";
import ButtonWithLabel from "../buttons/ButtonWithLabel";
import useProducts from "../hooks/useProducts";

const MainContent = () => {
  const { allProducts } = useStates();
  const { addToCart, fetchProductDetails } = useProducts();
  // console.log("Main Content", allProducts);

  const navigate = useNavigate();

  // Function to get unique categories
  const getUniqueCategories = () => {
    const uniqueCategories = [];
    allProducts.forEach((product) => {
      if (!uniqueCategories.includes(product.category)) {
        uniqueCategories.push(product.category);
      }
    });
    return uniqueCategories;
  };

  // Function to get a random product from each category
  const getRandomProductByCategory = (category) => {
    const categoryProducts = allProducts.filter(
      (product) => product.category === category
    );
    const randomIndex = Math.floor(Math.random() * categoryProducts.length);
    return categoryProducts[randomIndex];
  };

  // State to manage whether to show more details for each product
  const [expandedStates, setExpandedStates] = useState(
    Array(getUniqueCategories().length).fill(false)
  );

  // State to store random products from each category
  const [randomProducts, setRandomProducts] = useState([]);

  // Initialize random products and expanded states when the component mounts
  React.useEffect(() => {
    const categories = getUniqueCategories();
    const randomProducts = categories.map((category) => {
      return getRandomProductByCategory(category);
    });
    setRandomProducts(randomProducts);
  }, []);

  // Toggle the expanded state for a specific product
  const toggleExpanded = (index) => {
    const newExpandedStates = [...expandedStates];
    newExpandedStates[index] = !newExpandedStates[index];
    setExpandedStates(newExpandedStates);
  };
  const handleSearch = (category) => {
    // console.log("Category", category);
    navigate(`/search?term=${category}&category=${category}`);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
  };
  const handleBuyNow = (product) => {
    addToCart(product);
    navigate(`/checkOutPage`);
  };

  return (
    <Box
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#EAEDED",
        height: "100%",
      }}
      // width={"100vw"}
    >
      <Box className="main_page_container">
        <Box>
          <TopCarasol />
        </Box>
        <Box>
          <Box
            className="main_page_advertisement_container"
            zIndex={1}
            marginTop={-8}
            position={"relative"}
          >
            <Grid container spacing={{ xs: 1, sm: 2 }}>
              {randomProducts?.map((product, index) => (
                <Grid item key={product.category} xs={12} sm={6} md={4} lg={3}>
                  <Card
                    sx={{
                      padding: "8px",
                    }}
                  >
                    <Box onClick={(e) => handleSearch(product.category)}>
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
                          transition: "transform 0.3s ease-in-out",
                          "&:hover": {
                            transform: "scale(1.1)", // You can adjust the scale factor as needed
                          },
                        }}
                        marginTop={"10px"}
                        image={product.imageUrl}
                        title="product"
                      />
                    </Box>
                    <CardContent>
                      <Typography variant="body2">
                        {expandedStates[index]
                          ? product.description
                          : product.description.slice(0, 9) + " ..."}
                        <Button
                          onClick={() => toggleExpanded(index)}
                          color="primary"
                        >
                          {expandedStates[index] ? "Show Less" : "Show More"}
                        </Button>
                      </Typography>
                      <Box display={"flex"} justifyContent={"space-between"}>
                        <ButtonWithLabel
                          label="Add to Cart"
                          ButtonWidth={{
                            xs: "100px",
                            sm: "100px",
                            md: "100px",
                            lg: "120px",
                          }}
                          fontSize={{
                            xs: "8px",
                            sm: "8px",
                            md: "9px",
                            lg: "12px",
                          }}
                          backgroundColor={"green"}
                          onClick={() => {
                            handleAddToCart(product);
                          }}
                        />
                        <ButtonWithLabel
                          label="Buy Now"
                          ButtonWidth={{
                            xs: "100px",
                            sm: "100px",
                            md: "90px",
                            lg: "120px",
                          }}
                          fontSize={{
                            xs: "8px",
                            sm: "8px",
                            md: "10px",
                            lg: "14px",
                          }}
                          backgroundColor={"red"}
                          onClick={() => {
                            handleBuyNow(product);
                          }}
                        />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
        <FeedCarsol allProducts={allProducts} />
      </Box>
    </Box>
  );
};

export default MainContent;
