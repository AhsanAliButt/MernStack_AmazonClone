import React, { useState } from "react";
import "./styles.css";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import {
  addItem,
  decrement,
  increment,
  removeItem,
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
  const items = useSelector((state) => state.cart.items);
  // console.log(items);
  const [removeProduct, setRemoveProduct] = useState();
  // let { id } = useParams();
  // console.log("IDDDDDDDD", id);
  const dispatch = useDispatch();
  const handleRemoveItem = (index) => {
    console.log(index);
    dispatch(removeItem(index));
  };
  const handleIncrement = (e) => {
    console.log("ID OF PRODUCT", e);
    dispatch(increment(e));
  };
  const handleDecrement = (e) => {
    console.log("ID OF PRODUCT", e);
    dispatch(decrement(e));
  };
  // console.log("INDEX", index);
  return (
    <Grid container mt={2}>
      <Grid item xs={2}>
        <CardMedia
          component="img"
          alt="green iguana"
          style={{
            minWidth: "230px",

            maxHeight: "200px",
            objectFit: "contain",
            marginTop: "-1px",
          }}
          image={item.imageUrl}
        />
      </Grid>
      <Grid item xs={6}>
        <Card sx={{ maxWidth: 600 }} index={index}>
          <CardContent>
            <Box>
              <Typography gutterBottom variant="h5" component="div">
                {item.name || "Apple"}
                <Box>
                  <DeleteOutlineOutlinedIcon
                    style={{ color: "red", cursor: "pointer" }}
                    onClick={() => handleRemoveItem(index)}
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
                  ? () => handleRemoveItem(index)
                  : () => handleDecrement(item._id)
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
            <Button onClick={() => handleIncrement(item._id)}>
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
