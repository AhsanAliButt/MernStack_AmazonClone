import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // You can choose the storage mechanism you prefer
import cartReducer from "../slicers/cartSlice";
import productReducer from "../slicers/productSlice";

// Define the persist config for each slice
const cartPersistConfig = {
  key: "cart",
  storage, // Use the same storage mechanism
};

const productPersistConfig = {
  key: "product",
  storage, // Use the same storage mechanism
};

// Wrap each reducer with persistReducer
const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);
const persistedProductReducer = persistReducer(
  productPersistConfig,
  productReducer
);

export const store = configureStore({
  reducer: {
    cart: persistedCartReducer,
    product: persistedProductReducer,
  },
});

export const persistor = persistStore(store);
