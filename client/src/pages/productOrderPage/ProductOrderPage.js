import React, { useEffect, useState } from "react";
import InfoBar from "../../components/infoBar/InfoBar";
import "./productOrderPage.css";
import Grid from "@mui/material/Grid";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import ButtonWithLabel from "../../components/buttons/ButtonWithLabel";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import getSymbolFromCurrency from "currency-symbol-map";
import { ArrowDropDown } from "@mui/icons-material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../redux/slicers/cartSlice";
import axios from "axios";

const ProductOrderPage = () => {
  const [productDetails, setProductDetails] = useState([]);

  const dispatch = useDispatch();
  const count = useSelector((state) => state.cart.count);
  const items = useSelector((state) => state.cart.items);
  // console.log("ITEMSsssssssssssss", items);

  // console.log("Product Details", productDetails);
  let { id } = useParams();
  // console.log("Product id", id);
  useEffect(() => {
    let data = [
      {
        _id: "62f92563ea2f71ff4c652b37",
        user: "62f12f9296b98b652b6cac93",
        name: "SAMSUNG Galaxy A13 5G",
        description:
          "SAMSUNG Galaxy A13 5G Cell Phone, Factory Unlocked Android Smartphone, 64GB, Triple Lens Camera, Infinity Display Screen, Long Battery Life, Expandable Storage, US Version, Green",
        price: 249.99,
        category: "Mobiles",
        imageUrl:
          "https://ik.imagekit.io/amazonClone/614Bt9UXztL._AC_SY741__deBMUkkap.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1660493318143",
        reviewsAverage: 0,
        rating: 0,
        stock: 19,
        createdAt: "2022-08-14T16:40:03.294Z",
        reviews: [],
        updatedAt: "2022-08-14T16:40:03.294Z",
        __v: 0,
      },
      {
        _id: "62f926cdea2f71ff4c652b3a",
        user: "62f12f9296b98b652b6cac93",
        name: "SAMSUNG Galaxy S21",
        description:
          "SAMSUNG Galaxy S21 Ultra 5G Factory Unlocked Android Cell Phone 128GB US Version Smartphone Pro-Grade Camera 8K Video 108MP High Res, Phantom Silver",
        price: 1147.88,
        category: "Mobiles",
        imageUrl:
          "https://ik.imagekit.io/amazonClone/61bLefD79-L._AC_SX679_S21_XbhVrc11M.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1660495309899",
        reviewsAverage: 0,
        rating: 0,
        stock: 15,
        createdAt: "2022-08-14T16:46:05.658Z",
        reviews: [],
        updatedAt: "2022-08-14T16:46:05.658Z",
        __v: 0,
      },
      {
        _id: "62f92777ea2f71ff4c652b3d",
        user: "62f12f9296b98b652b6cac93",
        name: "Apple iPhone 11 Pro Max",
        description:
          "Apple iPhone 11 Pro Max, 256GB, Gold - Fully Unlocked (Renewed Premium)",
        price: 719,
        category: "Mobiles",
        imageUrl:
          "https://ik.imagekit.io/amazonClone/61zZjQXIAmL._AC_SX679_iPHONE11_gmU9Nn7gl.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1660495572729",
        reviewsAverage: 0,
        rating: 0,
        stock: 10,
        createdAt: "2022-08-14T16:48:55.056Z",
        reviews: [],
        updatedAt: "2022-08-14T16:48:55.056Z",
        __v: 0,
      },
      {
        _id: "62f92867ea2f71ff4c652b40",
        user: "62f12f9296b98b652b6cac93",
        name: "Apple iPhone 12",
        description:
          "Apple iPhone 12, 64GB, White - Unlocked (Renewed Premium)",
        price: 819,
        category: "Mobiles",
        imageUrl:
          "https://ik.imagekit.io/amazonClone/61kYyYE90qL._AC_SY741_12_HT8qNv_Lu.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1660495838864",
        reviewsAverage: 0,
        rating: 0,
        stock: 10,
        createdAt: "2022-08-14T16:52:55.442Z",
        reviews: [],
        updatedAt: "2022-08-14T16:52:55.442Z",
        __v: 0,
      },
    ];
    data.filter((product) => {
      if (product._id === id) {
        // console.log("Product", product);
        setProductDetails(product);
      }
    });
  }, []);
  const addToCart = () => {
    dispatch(addItem(productDetails));
  };
  return (
    <>
      <InfoBar />
      <div className="productOrderPage_container">
        <div
          style={{
            display: "flex",
            margin: "20px",
          }}
        >
          <Grid container>
            <Grid item xs={1}>
              <Button variant="contained" color="success">
                Hello World
              </Button>
            </Grid>
            <Grid item xs={5}>
              <img
                src={
                  productDetails.imageUrl || "https://via.placeholder.com/150"
                }
                alt=""
                srcset=""
                width={600}
                height={600}
              />
            </Grid>
            <Grid
              item
              xs={4}
              style={{
                marginTop: "20px",
              }}
            >
              <div>
                <Box className="product_name">{productDetails.description}</Box>
                <Box>
                  <Rating
                    name="read-only"
                    value="3"
                    readOnly
                    style={{
                      fontSize: "20px",
                    }}
                  />
                  4.5
                </Box>
                <div>
                  {getSymbolFromCurrency("PKR")}{" "}
                  <span
                    style={{
                      fontSize: "24px",
                    }}
                  >
                    {productDetails.price}
                  </span>{" "}
                </div>
                <div>
                  {productDetails.stock < 1
                    ? "Out of Stock"
                    : `${productDetails.stock} in stock`}
                </div>
                <Box
                  style={{
                    display: "flex",
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                >
                  Free Shipping
                </Box>
              </div>
            </Grid>
            <Grid
              item
              xs={2}
              style={{
                border: "1px solid black",
                padding: "10px",
              }}
            >
              <Box
                sx={{
                  marginBottom: "10px",
                }}
              >
                {getSymbolFromCurrency("PKR")} {productDetails.price}
              </Box>
              <Box
                sx={{
                  fontSize: "14px",
                  alignItems: "center",
                  justifyContent: "center",
                  marginY: "15px",
                  fontFamily: "Roboto",
                }}
              >
                {getSymbolFromCurrency("PKR")}{" "}
                {productDetails.price - productDetails.price * 0.6} Shipping &
                Import Fees Deposit to Pakistan Details <ArrowDropDown />
              </Box>
              <Box
                sx={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  marginY: "20px",
                }}
              >
                Delivery August 17 - 30
              </Box>
              <Box
                sx={{
                  fontSize: "14px",
                  marginY: "20px",
                  fontWeight: "bold",
                }}
              >
                <LocationOnOutlinedIcon /> Deliver to Pakistan
              </Box>
              <Box>
                {productDetails.stock < 1
                  ? "Out of Stock"
                  : `${productDetails.stock} in stock`}
              </Box>
              <ButtonWithLabel
                label={"ADD TO CART"}
                sx={{
                  marginTop: "10px",
                }}
                style={{
                  marginTop: "10px",
                  color: "black",
                  backgroundColor: "#ffd712",
                  fontFamily: "Roboto-Medium",
                  fontWeight: 400,
                }}
                onClick={addToCart}
              />
              <Link
                to="/checkOutPage"
                style={{
                  textDecoration: "none",
                }}
              >
                <ButtonWithLabel
                  label={"BUY NOW "}
                  style={{
                    marginTop: "10px",
                    backgroundColor: "#ffa418",
                  }}
                />
              </Link>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default ProductOrderPage;
