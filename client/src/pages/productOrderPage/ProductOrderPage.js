import React from "react";
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

const ProductOrderPage = () => {
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
                src="https://ik.imagekit.io/amazonClone/51PuFBgBK4L._AC_UL640_FMwebp_QL65__rpyDlHCJu.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1660049731394"
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
                <Box className="product_name">
                  SAMSUNG Galaxy S21 Ultra 5G Factory Unlocked Android Cell
                  Phone 128GB US Version Smartphone Pro-Grade Camera 8K Video
                  108MP High Res, Phantom Silver{" "}
                </Box>
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
                    100
                  </span>{" "}
                </div>
                <div>In Stock</div>
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
                {getSymbolFromCurrency("PKR")} 64.99101.27 Shipping & Import
                Fees Deposit to Pakistan Details <ArrowDropDown />
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
              />
              <ButtonWithLabel
                label={"BUY NOW "}
                style={{
                  marginTop: "10px",
                  backgroundColor: "#ffa418",
                }}
              />
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default ProductOrderPage;
