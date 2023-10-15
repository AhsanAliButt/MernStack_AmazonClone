import React, { useState } from "react";
import "./styles.css";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { removeItem } from "../../redux/slicers/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
const CheckOutItems = ({ item, index }) => {
  const items = useSelector((state) => state.cart.items);
  console.log(items);
  const [removeProduct, setRemoveProduct] = useState();
  let { id } = useParams();
  console.log("IDDDDDDDD", id);
  const dispatch = useDispatch();
  const handleRemoveItem = (index) => {
    console.log(index);
    dispatch(removeItem(index));
  };
  console.log("INDEX", index);
  return (
    <Box key={index}>
      <Box className="checkOutItem_container">
        <Box className="left_container">
          <Box>
            <img
              src={item.imageUrl}
              className="checkOutItem_img"
              alt=""
              srcset=""
              height={240}
            />
          </Box>
          <Box
            style={{
              padding: "10px",
            }}
          >
            <Typography className="text_style">{item.description}</Typography>
            <Typography className="text_style"> {item.price}</Typography>
            <Typography className="text_style">
              {item.stock < 1 ? "Out of Stock" : "In Stock"}
            </Typography>
          </Box>
        </Box>
        <Box>
          <RemoveCircleOutlineIcon
            style={{ color: "red", cursor: "pointer" }}
            onClick={() => handleRemoveItem(index)}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default CheckOutItems;
