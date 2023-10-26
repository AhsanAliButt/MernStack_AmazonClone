import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // You can choose the storage mechanism you prefer
import cartReducer from "../slicers/cartSlice";
import productReducer from "../slicers/productSlice";
import authReducer from "../slicers/authSlice";
import paymentReducer from "../slicers/paymentSlice";
// Define the persist config for each slice
const cartPersistConfig = {
  key: "cart",
  storage, // Use the same storage mechanism
};

const productPersistConfig = {
  key: "product",
  storage, // Use the same storage mechanism
};
const authPersistConfig = {
  key: "auth",
  storage, // Use the same storage mechanism
};
const paymentPersistConfig = {
  key: "payment",
  storage, // Use the same storage mechanism
};

// Wrap each reducer with persistReducer
const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);
const persistedProductReducer = persistReducer(
  productPersistConfig,
  productReducer
);
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedPaymentReducer = persistReducer(
  paymentPersistConfig,
  paymentReducer
);

export const store = configureStore({
  reducer: {
    cart: persistedCartReducer,
    product: persistedProductReducer,
    auth: persistedAuthReducer,
    payment: persistedPaymentReducer,
  },
});

export const persistor = persistStore(store);
