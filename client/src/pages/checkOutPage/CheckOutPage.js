import React, { useEffect } from "react";
import CheckOutItems from "../../components/checkOutItems/CheckOutItems";
import "./styles.css";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import getSymbolFromCurrency from "currency-symbol-map";
import ButtonWithLabel from "../../components/buttons/ButtonWithLabel";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { useSelector, useDispatch } from "react-redux";
import { ArrowDropDown } from "@mui/icons-material";
import { loadStripe } from "@stripe/stripe-js";
import useProducts from "../../components/hooks/useProducts";
import { setTotal } from "../../redux/slicers/cartSlice";
import axios from "axios";
const CheckOutPage = () => {
  const { createPayment } = useProducts();

  const items = useSelector((state) => state.cart.items);
  console.log("items in Checkout Page", items);
  const calculateTotal = (items) =>
    items.reduce((acc, item) => acc + item.quantity * item.price, 0);
  const handlePayments = async () => {
    const stripe = await loadStripe(
      "pk_test_51O4QRMIXiyixalhgAWATTpSnrqDhM6oVzTLiXdVOOUrcypbIDevbYCDPExbV0geNWjmO3yCdBYuKUCjqktB9GWZM00pQs7TKBi"
    );
    createPayment(stripe);
  };
  return (
    <Box
      className="checkOutPage__container"
      // sx={{
      //   "@media (min-width:400px)": {
      //     flexDirection: "column",
      //     maxWidth: "100wv",
      //   },
      // }}
    >
      <Grid
        container
        sx={{
          flexDirection: "row", // Default direction
          "@media (max-width: 600px)": {
            display: "flex",
            flexDirection: "column", // Change to column on screens 600px or less
            width: "100%", // Set width to 100%
          },
        }}
      >
        <Grid item xs={9}>
          <Typography>
            <Box className="checkOutPage__title">Check Out</Box>
          </Typography>
          {items.map((item, index) => {
            return <CheckOutItems item={item} index={index} />;
          })}
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={3}
          style={{
            border: "1px solid #e0e0e0",
            padding: "20px",
            marginTop: "65px",
          }}
        >
          <Box
            style={{
              display: "flex",
              fontSize: "22px",
            }}
          >
            TotalItems :{" "}
            <Typography
              style={{
                marginLeft: "10px",
                fontSize: "22px",
              }}
            >
              {items.length}
            </Typography>
          </Box>
          <Box
            style={{
              display: "flex",
            }}
          >
            <Typography
              style={{
                fontSize: "20px",
              }}
            >
              <span
                style={{
                  color: "red",
                }}
              >
                Subtotal
              </span>
              {/* : {grandTotal} */}:{calculateTotal(items).toFixed(2)}
            </Typography>
          </Box>
          <Box
            sx={{
              marginBottom: "10px",
              fontSize: "20px",
            }}
          >
            {getSymbolFromCurrency("PKR")} 64.99
          </Box>
          <Box
            sx={{
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginY: "15px",
              fontFamily: "Roboto",
            }}
          >
            <Typography
              style={{
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              {getSymbolFromCurrency("PKR")} 64.99101.27 Shipping & Import Fees
              Deposit to Pakistan Details <ArrowDropDown />
            </Typography>{" "}
          </Box>
          <Box
            sx={{
              fontSize: "14px",
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
              display: "flex",
              alignItems: "center",
            }}
          >
            <LocationOnOutlinedIcon
              style={{
                color: "black",
              }}
            />
            <Typography
              style={{
                fontSize: "14px",
                fontWeight: "bold",
                marginTop: "8px",
              }}
            >
              Deliver to Pakistan
            </Typography>
          </Box>
          <Box>In Stock</Box>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ButtonWithLabel
              label={"Proceed to Buy"}
              sx={{
                marginTop: "10px",
              }}
              style={{
                backgroundColor: "#ffa418",
              }}
              onClick={handlePayments}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CheckOutPage;
