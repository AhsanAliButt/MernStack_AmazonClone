import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createSelector } from "reselect"; // its normaly use to memorize the selectors used in the component
import { createPayment } from "../../components/constant/productApiCalls";

const fetchPayment = createAsyncThunk(
  "payment/fetchPayment",
  async (data, thunkApi) => {
    console.log("Payment Slice New Payment", data);
    try {
      const newPayment = await createPayment(data);
      console.log("UserAUTH", newPayment);
      if (newPayment.status === 200) {
        return thunkApi.fulfillWithValue();
      } else if (newPayment.status === 400) {
        console.log("Authentication failed:", newPayment.message);
        return thunkApi.rejectWithValue(newPayment.message);
      } else {
        // Handle other status codes as needed
        console.error("Unexpected status code:", newPayment.status);
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
      state.newPaymentAdded = true; // Set this flag to true
      state.newPayment = action.payload;
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
  //   fetchPayments,
  fetchPayment,
};
// export states
export default paymentSlice.reducer;

const selectPaymentState = (state) => state.payment; // selector function to get the Payment state.

// a selector that extracts the properties want to access
export const selectPayments = createSelector(
  selectPaymentState,
  (paymentState) => paymentState.sessionId
);
