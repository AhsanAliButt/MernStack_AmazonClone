import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { isRejectedWithValue, rejectWithValue } from "@reduxjs/toolkit";
import {
  resetPassword,
  resetPasswordEmail,
  signInUser,
  signUpUser,
  changeUserDetails,
  updateUserDetails,
  signInWithGoogle,
  signOutUserRequest,
  // userDetailsByToken,
} from "../../components/constant/authApiCalls";
import { createSelector } from "reselect"; // its normaly use to memorize the selectors used in the component
import { useNavigate } from "react-router-dom";
import { addItem, clearCart, setItemsFromList } from "./cartSlice";
import { useDispatch } from "react-redux";

const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, thunkApi) => {
    try {
      const user = await signInUser(credentials);
      // localStorage.setItem("usersdatatoken", user.token);
      thunkApi.dispatch(setItemsFromList(user.cart.products));
      if (user.status === 200) {
        return thunkApi.fulfillWithValue(user);
      } else if (user.status === 400) {
        console.log("Authentication failed:", user.message);
        return thunkApi.rejectWithValue(user.message);
      } else {
        // Handle other status codes as needed
        console.error("Unexpected status code:", user.status);
        return thunkApi.rejectWithValue("Unexpected status code");
      }
    } catch (error) {
      console.error("Error", error);

      return thunkApi.rejectWithValue(error); // Use rejectWithValue to handle rejections
    }
  }
);
const loginWithGoogle = createAsyncThunk(
  "auth/loginWithGoogle",
  async (token, thunkApi) => {
    const state = thunkApi.getState();
    const localCart = state.cart.items;

    try {
      const user = await signInWithGoogle(token);
      // localStorage.setItem("usersdatatoken", user.token);
      thunkApi.dispatch(setItemsFromList([]));
      console.log("Cart Items:", user.cart.products);
      thunkApi.dispatch(setItemsFromList(user.cart.products));
      if (user.status === 200) {
        return thunkApi.fulfillWithValue(user);
      } else if (user.status === 400) {
        console.log("Authentication failed:", user.message);
        return thunkApi.rejectWithValue(user.message);
      } else {
        // Handle other status codes as needed
        console.error("Unexpected status code:", user.status);
        return thunkApi.rejectWithValue("Unexpected status code");
      }
    } catch (error) {
      console.error("Error", error);

      return thunkApi.rejectWithValue(error); // Use rejectWithValue to handle rejections
    }
  }
);
const createUser = createAsyncThunk(
  "auth/createUser",
  async (credentials, thunkApi) => {
    console.log("AuthSliceCreateUserCredentials", credentials);
    try {
      const user = await signUpUser(credentials);
      console.log("UserAUTH", user);
      if (user.status === 200) {
        return thunkApi.fulfillWithValue(user);
      } else if (user.status === 400) {
        console.log("Authentication failed:", user.message);
        return thunkApi.rejectWithValue(user.message);
      } else {
        // Handle other status codes as needed
        console.error("Unexpected status code:", user.status);
        return thunkApi.rejectWithValue("Unexpected status code");
      }
      // localStorage.setItem("usersdatatoken", user.token);
    } catch (error) {
      console.error("Error", error);
    }
  }
);

const resetPasssword = createAsyncThunk(
  "auth/resetPassword",
  async (data, thunkApi) => {
    try {
      const response = await resetPassword(data);
      // localStorage.setItem("usersdatatoken", user.token);
      console.log("From Api", response);
      if (response.status === 200) {
        return thunkApi.fulfillWithValue(response);
      } else if (response.status === 400) {
        console.log("Authentication failed:", response.message);
        return thunkApi.rejectWithValue(response.message);
      } else {
        // Handle other status codes as needed
        console.error("Unexpected status code:", response.status);
        return thunkApi.rejectWithValue("Unexpected status code");
      }
    } catch (error) {
      console.error("Error", error);

      return thunkApi.rejectWithValue(error); // Use rejectWithValue to handle rejections
    }
  }
);
const sendResetPassswordEmail = createAsyncThunk(
  "auth/sendResetPassswordEmail",
  async (email, thunkApi) => {
    try {
      const response = await resetPasswordEmail(email);
      // localStorage.setItem("usersdatatoken", user.token);
      console.log("From Api", response);
      if (response.status === 200) {
        return thunkApi.fulfillWithValue(response);
      } else if (response.status === 400) {
        console.log("Authentication failed:", response.message);
        return thunkApi.rejectWithValue(response.message);
      } else {
        // Handle other status codes as needed
        console.error("Unexpected status code:", response.status);
        return thunkApi.rejectWithValue("Unexpected status code");
      }
    } catch (error) {
      console.error("Error", error);

      return thunkApi.rejectWithValue(error); // Use rejectWithValue to handle rejections
    }
  }
);
const fetchUpdateUserDetails = createAsyncThunk(
  "auth/fetchUpdateUserDetails",
  async (credentials, thunkApi) => {
    try {
      const response = await updateUserDetails(credentials);
      // localStorage.setItem("usersdatatoken", user.token);
      console.log("From Api", response);
      if (response.status === 200) {
        return thunkApi.fulfillWithValue(response);
      } else if (response.status === 400) {
        console.log("Authentication failed:", response.message);
        return thunkApi.rejectWithValue(response.message);
      } else {
        // Handle other status codes as needed
        console.error("Unexpected status code:", response.status);
        return thunkApi.rejectWithValue("Unexpected status code");
      }
    } catch (error) {
      console.error("Error", error);

      return thunkApi.rejectWithValue(error); // Use rejectWithValue to handle rejections
    }
  }
);
const signOutUser = createAsyncThunk(
  "auth/signOutUser",
  async (_, thunkApi) => {
    const state = thunkApi.getState();
    const token = state.auth.token;
    try {
      console.log("AuthSliceSignOut");
      // Make the API call to sign out
      thunkApi.dispatch(clearUser());
      thunkApi.dispatch(clearCart());
      const response = await signOutUserRequest(token);

      if (response.status === 200) {
        // Dispatch any additional actions or handle the response as needed
        // For example, clear user data, reset authentication state, etc.
        thunkApi.dispatch(clearUser());
        // You can also dispatch other actions if needed
        // thunkApi.dispatch(someOtherAction());

        return thunkApi.fulfillWithValue(response);
      } else {
        console.error("Unexpected status code:", response.status);
        return thunkApi.rejectWithValue("Unexpected status code");
      }
    } catch (error) {
      console.error("Error", error);
      return thunkApi.rejectWithValue(error);
    }
  }
);
// const signOutUser = createAsyncThunk(
//   "auth/signOutUser",
//   async (_, thunkApi) => {
//     try {
//       console.log("AuthSliceSignOut");

//       // Clear local user and cart data
//       thunkApi.dispatch(clearUser());
//       thunkApi.dispatch(clearCart());

//       // You can perform any other local state changes here if needed

//       // No API call is needed, so you can immediately fulfill the promise
//       return thunkApi.fulfillWithValue("Sign-out successful");
//     } catch (error) {
//       console.error("Error", error);
//       return thunkApi.rejectWithValue(error);
//     }
//   }
// );
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: "",
    token: null,
    userId: null,
    isAuthenticated: false,

    lastRoute: null, // Initialize lastRoute as null
    // isLogin: AsyncStorage.getItem("isLogin").then() === "ture" ? true : false,
    loading: false,
    error: null,
    success: null,
    cartItems: [],
  },
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
    clearUser: (state) => {
      state.user = "";
      state.token = null;
      state.isAuthenticated = false;
      // isLogin: AsyncStorage.getItem("isLogin").then() === "ture" ? true : false,
      state.loading = false;
      state.error = null;
      state.userId = null;
      // Dispatch the clearItems action to clear the items state in the other slice
      clearCart(state.cart);
    },
    setPreviousRoute: (state, action) => {
      state.lastRoute = action.payload;
    },
  },
  extraReducers: {
    // add your async reducers here
    [loginUser.pending]: (state, action) => {
      state.loading = true;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
      state.userId = action.payload.user._id;
      // Store the last route
    },
    [loginUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [loginWithGoogle.pending]: (state, action) => {
      state.loading = true;
    },
    [loginWithGoogle.fulfilled]: (state, action) => {
      // const dispatch = useDispatch();
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
      state.userId = action.payload.user._id;
    },
    [loginWithGoogle.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [createUser.pending]: (state, action) => {
      state.loading = true;
    },
    [createUser.fulfilled]: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
      // Store the last route
    },
    [createUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [resetPasssword.pending]: (state, action) => {
      state.loading = true;
    },
    [resetPasssword.fulfilled]: (state, action) => {
      state.success = action.payload;
      state.loading = false;
    },
    [resetPasssword.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [sendResetPassswordEmail.pending]: (state, action) => {
      state.loading = true;
    },
    [sendResetPassswordEmail.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = action.payload;
    },
    [sendResetPassswordEmail.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [fetchUpdateUserDetails.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchUpdateUserDetails.fulfilled]: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
      // Store the last route
    },
    [fetchUpdateUserDetails.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [signOutUser.pending]: (state, action) => {
      state.loading = true;
    },
    [signOutUser.fulfilled]: (state, action) => {
      // Handle sign-out success, clear user-related state
      state.user = "";
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      state.userId = null;
      state.success = null;
      state.cartItems = [];
      state.success = action.payload;

      // You can also handle other state changes or dispatch additional actions if needed

      // Store the last route or perform other actions if needed
    },
    [signOutUser.rejected]: (state, action) => {
      // Handle sign-out failure
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Action creators
export const { clearErrors, clearUser, setPreviousRoute } = authSlice.actions;
export {
  loginUser,
  signOutUser,
  createUser,
  resetPasssword,
  sendResetPassswordEmail,
  fetchUpdateUserDetails,
  loginWithGoogle,
};
// export states
export default authSlice.reducer;

const selectAuthState = (state) => state.auth;

export const selectUser = createSelector(
  [selectAuthState],
  (auth) => auth.user
);
export const selectToken = createSelector(
  [selectAuthState],
  (auth) => auth.token
);

export const selectIsAuthenticated = createSelector(
  [selectAuthState],
  (auth) => auth.isAuthenticated
);

export const selectAuthLoading = createSelector(
  [selectAuthState],
  (auth) => auth.loading
);

export const selectAuthError = createSelector(
  [selectAuthState],
  (auth) => auth.error
);
export const selectlastRoute = createSelector(
  [selectAuthState],
  (auth) => auth.lastRoute
);
export const selectUserId = createSelector(
  [selectAuthState],
  (auth) => auth.userId
);
export const selectCartItems = createSelector(
  [selectAuthState],
  (auth) => auth.cartItems
);
