import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { isRejectedWithValue, rejectWithValue } from "@reduxjs/toolkit";
import { signInUser, signUpUser } from "../../components/constant/authApiCalls";
import { createSelector } from "reselect"; // its normaly use to memorize the selectors used in the component
import { useNavigate } from "react-router-dom";
const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, thunkApi) => {
    try {
      const user = await signInUser(credentials);
      // localStorage.setItem("usersdatatoken", user.token);
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

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    isAuthenticated: false,

    lastRoute: null, // Initialize lastRoute as null
    // isLogin: AsyncStorage.getItem("isLogin").then() === "ture" ? true : false,
    loading: false,
    error: null,
  },
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
    clearUser: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      // isLogin: AsyncStorage.getItem("isLogin").then() === "ture" ? true : false,
      state.loading = false;
      state.error = null;
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
      // Store the last route
    },
    [loginUser.rejected]: (state, action) => {
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
  },
});

// Action creators
export const { clearErrors, clearUser, setPreviousRoute } = authSlice.actions;
export { loginUser, createUser };
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

export const selectLoading = createSelector(
  [selectAuthState],
  (auth) => auth.loading
);

export const selectError = createSelector(
  [selectAuthState],
  (auth) => auth.error
);
export const selectlastRoute = createSelector(
  [selectAuthState],
  (auth) => auth.lastRoute
);
