import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../slicers/cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
