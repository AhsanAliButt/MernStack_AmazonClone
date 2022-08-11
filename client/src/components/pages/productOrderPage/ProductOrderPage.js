import React from "react";
import InfoBar from "../../reUseAbleComponents/infoBar/InfoBar";
import "./productOrderPage.css";
import Grid from "@mui/material/Grid";
import Rating from "@mui/material/Rating";

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
            <Grid item xs={4}>
              <img
                src="https://ik.imagekit.io/amazonClone/51PuFBgBK4L._AC_UL640_FMwebp_QL65__rpyDlHCJu.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1660049731394"
                alt=""
                srcset=""
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
                <div className="product_name">
                  SAMSUNG Galaxy S21 Ultra 5G Factory Unlocked Android Cell
                  Phone 128GB US Version Smartphone Pro-Grade Camera 8K Video
                  108MP High Res, Phantom Silver{" "}
                </div>
                <div>
                  <Rating
                    name="read-only"
                    value="3"
                    readOnly
                    style={{
                      fontSize: "20px",
                    }}
                  />
                  4.5
                </div>
                <div>Rs. 1000</div>
                <div>In Stock</div>
                <div>Free Shipping</div>
              </div>
            </Grid>
            <Grid item xs={3}>
              Price
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default ProductOrderPage;
