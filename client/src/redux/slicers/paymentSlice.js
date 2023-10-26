import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createSelector } from "reselect"; // its normaly use to memorize the selectors used in the component
import { createPayment } from "../../components/constant/productApiCalls";

const fetchPayment = createAsyncThunk(
  "product/fetchPayment",
  async (data, thunkApi) => {
    console.log("Payment Slice New Payment", data);
    try {
      const newProduct = await createPayment(data);
      console.log("UserAUTH", newProduct);
      if (newProduct.status === 200) {
        return thunkApi.fulfillWithValue();
      } else if (newProduct.status === 400) {
        console.log("Authentication failed:", newProduct.message);
        return thunkApi.rejectWithValue(newProduct.message);
      } else {
        // Handle other status codes as needed
        console.error("Unexpected status code:", newProduct.status);
        return thunkApi.rejectWithValue("Unexpected status code");
      }
      // localStorage.setItem("usersdatatoken", user.token);
    } catch (error) {
      console.error("Error", error);
    }
  }
);

const initialState = {
  sessionId: "",
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    // add your non-async reducers here
  },
  extraReducers: {
    // add your async reducers here
    [fetchPayment.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchPayment.fulfilled]: (state, action) => {
      state.loading = false;
      state.newProductAdded = true; // Set this flag to true
      state.newProduct = action.payload;
    },
    [fetchPayment.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Action creators
export const {
  // add your non-async action creators here
} = paymentSlice.actions;
// export your async action creators here
export {
  //   fetchProducts,
  fetchPayment,
};
// export states
export default paymentSlice.reducer;

const selectPaymentState = (state) => state.payment; // selector function to get the product state.

// a selector that extracts the properties want to access
export const selectProducts = createSelector(
  selectPaymentState,
  (paymentState) => paymentState.sessionId
);
