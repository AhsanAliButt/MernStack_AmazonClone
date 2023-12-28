import React, { useState } from "react";
import "./styles.css";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import {
  addItem,
  decrement,
  fetchDecreaseQuantity,
  fetchRemoveItem,
  fetchAddItemToCart,
  increment,
  removeItem,
  fetchIncreaseQuantity,
} from "../../redux/slicers/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DoNotDisturbOnOutlinedIcon from "@mui/icons-material/DoNotDisturbOnOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

// ...
const CheckOutItems = ({ item, index }) => {
  const dispatch = useDispatch();
  const handleRemoveItem = (e) => {
    dispatch(fetchRemoveItem(e));
  };
  const handleIncrement = (productId) => {
    dispatch(fetchIncreaseQuantity(productId));
  };
  const handleDecrement = (e) => {
    console.log("Decrement", e);
    dispatch(fetchDecreaseQuantity(e));
  };

  return (
    <Grid container mt={2}>
      <Grid item xs={12} sm={12} md={3} lg={2}>
        <CardMedia
          component="img"
          alt="green iguana"
          style={{
            // minWidth: "230px",
            margin: 0,
            minHeight: "200px",
            maxHeight: "200px",
            objectFit: "contain",
            marginTop: "-1px",
          }}
          image={item.imageUrl}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={6}>
        <Card
          // sx={{ maxWidth: 600 }}
          sx={{
            margin: 0,
          }}
          index={index}
        >
          <CardContent>
            <Box>
              <Typography gutterBottom variant="h5" component="div">
                {item.name || "Apple"}
                <Box>
                  <DeleteOutlineOutlinedIcon
                    style={{ color: "red", cursor: "pointer" }}
                    onClick={() => handleRemoveItem(item.productId)}
                  />
                </Box>
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              {item.description}
            </Typography>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="body2" color="text.secondary">
                Price: {item.price}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Amount: {item.price * item.quantity}
              </Typography>
            </Box>
          </CardContent>
          <CardActions
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              onClick={
                item.quantity <= 1
                  ? () => handleRemoveItem(item.productId)
                  : () => handleDecrement(item.productId)
              }
            >
              <DoNotDisturbOnOutlinedIcon
                style={{
                  color: "red",
                }}
              />
            </Button>
            <Button disabled>
              <Typography textAlign="center">{item.quantity}</Typography>
            </Button>
            <Button
              onClick={() =>
                // console.log(item.productId)
                handleIncrement(item.productId)
              }
            >
              <AddCircleOutlineIcon
                style={{
                  color: "green",
                }}
              />
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default CheckOutItems;
