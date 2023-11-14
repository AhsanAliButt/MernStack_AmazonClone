import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { selectUser } from "./authSlice";
import { addItemToCart } from "../../components/constant/cartApiCalls";
const fetchAddItemToCart = createAsyncThunk(
  "cart/fetchAddItemToCart",
  async (item, thunkAPI) => {
    // Always add the item to local storage
    const state = thunkAPI.getState();
    const userId = state.auth.userId;
    const userToken = state.auth.token;
    const localCart = state.cart;
    // Perform local actions
    thunkAPI.dispatch(addItem(item));
    if (userId) {
      try {
        const response = await addItemToCart(item, userId, userToken);
        console.log("RESPONSE FOR CART API", response);
        if (response.status === 200) {
          // Scenario 1: If the status is 200, it's a successful response
          // You can handle it here and potentially return some data if needed
          // const item = { ...data, quantity: 1 }; // Create the item to add to the cart
          thunkAPI.dispatch(setTotal()); // Recalculate the total
          return item;
        } else if (response.status === 400) {
          // Scenario 2: If the status is 400, it's an error response
          // You can handle it here and reject with a message
          console.log("Item Add to Cart failed:", response.message);
          return thunkAPI.rejectWithValue(response.message);
        } else {
          // Scenario 3: Handle other status codes as needed
          // You can handle other status codes as needed
          console.error("Unexpected status code:", response.status);
          return thunkAPI.rejectWithValue("Unexpected status code");
        }
      } catch (error) {}
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: JSON.parse(localStorage.getItem("cart")) || {
    items: [],
    count: 0,
    total: 0,
  },
  reducers: {
    // add your non-async reducers here

    increment: (state, action) => {
      const productId = action.payload;

      const productIndex = state.items.findIndex(
        (item) => item._id === productId
      );

      if (productIndex >= 0) {
        console.log("Matched");
        state.items[productIndex].quantity += 1;
        // Dispatch the setTotal action to recalculate the total
        setTotal(state);
      }
    },
    decrement: (state, action) => {
      const productId = action.payload;

      const productIndex = state.items.findIndex(
        (item) => item._id === productId
      );

      if (productIndex !== -1) {
        if (state.items[productIndex].quantity > 0) {
          state.items[productIndex].quantity -= 1;
          setTotal(state);
        }
      }
    },
    addItem: (state, action) => {
      // const reduxStore = store.getState();
      // console.log("GET STATE", reduxStore);
      // const user = selectUser(state);
      // console.log(user, "User", user);
      const ItemIndex = state.items.findIndex(
        (item) => item._id === action.payload._id
      );

      if (ItemIndex >= 0) {
        state.items[ItemIndex].quantity += 1;
        setTotal();
      } else {
        const temp = { ...action.payload, quantity: 1 };
        state.items = [...state.items, temp];
        setTotal();
      }

      const products = state.items;
      console.log("PRODUCTS QUANTITY", products);
      // state.items.push(productWithQuantity);
      state.count = state.items.length;
      state.total = state.items.reduce((acc, item) => {
        console.log("Item Price", acc + item.price);
        return acc + item.price;
      }, 0);
      console.log("state Items", state.items);
      localStorage.setItem(
        "cart",
        JSON.stringify({
          items: state.items,
          count: state.count,
          total: state.total,
        })
      );
    },
    removeItem: (state, action) => {
      const indexToRemove = action.payload; // Assuming action.payload contains the index of the item to remove

      if (indexToRemove >= 0 && indexToRemove < state.items.length) {
        state.items.splice(indexToRemove, 1); // Remove the item from the items array
        state.count = state.items.length; // Update the count

        state.total = state.items.reduce((acc, item) => {
          return acc + item.price;
        }, 0); // Recalculate the total
        localStorage.setItem(
          "cart",
          JSON.stringify({
            items: state.items,
            count: state.count,
          })
        );
      } else {
        console.warn("Invalid index to remove item:", indexToRemove);
      }
    },
    setTotal: (state) => {
      console.log("Setting total");
      let totalPrice = 0;
      let products = state.items;
      console.log(products);
      products.map((ele, ind) => {
        totalPrice = ele.price * ele.quantity + totalPrice;
      });
      state.total = totalPrice;
    },
    saveToLocalCache: (state, action) => {
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
    },
  },

  extraReducers: {
    // add your async reducers here
  },
});
// Action creators
// export states
export const selectCount = (state) => state.cart.count;
export const selectItems = (state) => state.cart.items;
export const selectTotal = (state) => state.cart.total;

export const {
  increment,
  decrement,
  incrementByAmount,
  decrementByAmount,
  addItem,
  removeItem,
  setTotal,
  clearCart,
} = cartSlice.actions;

export { fetchAddItemToCart };

export default cartSlice.reducer;
