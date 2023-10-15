import React from "react";
import CheckOutItems from "../../components/checkOutItems/CheckOutItems";
import "./styles.css";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { autocompleteClasses, Typography } from "@mui/material";
import getSymbolFromCurrency from "currency-symbol-map";
import ButtonWithLabel from "../../components/buttons/ButtonWithLabel";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { useSelector, useDispatch } from "react-redux";
import { ArrowDropDown } from "@mui/icons-material";
import { red } from "@mui/material/colors";
import { useParams } from "react-router-dom";

const CheckOutPage = () => {
  const dispatch = useDispatch();
  const amount = useSelector((state) => state.cart.total);
  const items = useSelector((state) => state.cart.items);
  const grandTotal = amount.toFixed(2);
  return (
    <Box className="checkOutPage__container">
      <Grid container>
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
          xs={3}
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
              : {grandTotal}
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
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CheckOutPage;
