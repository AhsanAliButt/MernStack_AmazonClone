import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: JSON.parse(localStorage.getItem("cart")) || {
    items: [],
    count: 0,
    total: 0,
  },
  reducers: {
    // add your non-async reducers here
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    incrementByAmount: (state, action) => {
      state.count += action.payload;
    },
    decrementByAmount: (state, action) => {
      state.count -= action.payload;
    },
    addItem: (state, action) => {
      state.items.push(action.payload);
      state.count = state.items.length;
      state.total = state.items.reduce((acc, item) => {
        console.log("Item Price", acc + item.price);
        return acc + item.price;
      }, 0);
      console.log("state", state);
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
            total: state.total,
          })
        );
      } else {
        console.warn("Invalid index to remove item:", indexToRemove);
      }
    },
    setTotal: (state, action) => {
      state.total = action.payload;
    },
    saveToLocalCache: (state, action) => {
      localStorage.setItem("cart", JSON.stringify(state.items));
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
} = cartSlice.actions;
export default cartSlice.reducer;

// store items in local storage
// const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
