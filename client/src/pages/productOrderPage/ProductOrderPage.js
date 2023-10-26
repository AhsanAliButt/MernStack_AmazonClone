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
import useProductOrder from "./useProductOrder";
import axios from "axios";

const ProductOrderPage = () => {
  const { data } = useProductOrder();
  const [productDetails, setProductDetails] = useState([]);
  const dispatch = useDispatch();
  const count = useSelector((state) => state.cart.count);
  const items = useSelector((state) => state.cart.items);

  let { id } = useParams();
  useEffect(() => {
    // console.log("ITEMSSSSSSSSSSSSSSS", items);
    data.filter((product) => {
      if (product._id === id) {
        setProductDetails(product);
      }
    });
  }, [data, id]);

  const addToCart = () => {
    const productWithQuantity = { ...productDetails, quantity: 0 };
    dispatch(addItem(productWithQuantity));
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
