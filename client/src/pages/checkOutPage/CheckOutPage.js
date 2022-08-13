import React from "react";
import CheckOutItems from "../../components/checkOutItems/CheckOutItems";
import "./styles.css";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { autocompleteClasses, Typography } from "@mui/material";
import getSymbolFromCurrency from "currency-symbol-map";
import ButtonWithLabel from "../../components/buttons/ButtonWithLabel";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

import { ArrowDropDown } from "@mui/icons-material";

const CheckOutPage = () => {
  return (
    <Box className="checkOutPage__container">
      <Grid container>
        <Grid item xs={9}>
          <Typography>
            <Box className="checkOutPage__title">Check Out</Box>
          </Typography>
          <CheckOutItems />
          <CheckOutItems />
          <CheckOutItems />
          <CheckOutItems />
          <CheckOutItems />
          <CheckOutItems />
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
            }}
          >
            TotalItems :{" "}
            <Typography
              style={{
                marginLeft: "10px",
              }}
            >
              {" "}
              5{" "}
            </Typography>
          </Box>
          <Box
            style={{
              display: "flex",
            }}
          >
            Subtotal : <Typography> 1,50,000</Typography>
          </Box>
          <Box
            sx={{
              marginBottom: "10px",
            }}
          >
            {getSymbolFromCurrency("PKR")} 64.99
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
            {getSymbolFromCurrency("PKR")} 64.99101.27 Shipping & Import Fees
            Deposit to Pakistan Details <ArrowDropDown />
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
