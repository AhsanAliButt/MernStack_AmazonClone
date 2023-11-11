import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createSelector } from "reselect"; // its normaly use to memorize the selectors used in the component
import {
  getAllProducts,
  getSearchedProducts,
  getBrandSearchedProducts,
  addProduct,
  getCategorisedProducts,
  getProductsOfUser,
  updateProduct,
  deleteProduct,
} from "../../components/constant/productApiCalls";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const fetchProducts = createAsyncThunk("product/fetchProducts", async () => {
  try {
    const products = await getAllProducts();
    console.log("RESULT", products);
    return products;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
});

const fetchProductBySearch = createAsyncThunk(
  "product/fetchProductBySearch",
  async (data) => {
    console.log("search Query In Product Slice", data);
    try {
      const products = await getSearchedProducts(data);
      return products;
    } catch (error) {}
  }
);
const fetchProductByBrand = createAsyncThunk(
  "product/fetchProductByBrand",
  async (brand) => {
    console.log("ProductSliceBrand", brand);
    try {
      const products = await getBrandSearchedProducts(brand);
      console.log("RESULTBrands", products);
      return products;
    } catch (error) {}
  }
);
const fetchNewProduct = createAsyncThunk(
  "product/fetchNewProduct",
  async (data, thunkApi) => {
    console.log("Product Slice New Product", data);
    try {
      const newProduct = await addProduct(data);
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

const fetchProductsByCategory = createAsyncThunk(
  "product/fetchProductsByCategory",
  async (category, thunkApi) => {
    console.log("Product Slice New Product", category);
    try {
      const products = await getCategorisedProducts(category);
      console.log("UserAUTH", products);
      if (products.status === 200) {
        return thunkApi.fulfillWithValue();
      } else if (products.status === 400) {
        console.log("Authentication failed:", products.message);
        return thunkApi.rejectWithValue(products.message);
      } else {
        // Handle other status codes as needed
        console.error("Unexpected status code:", products.status);
        return thunkApi.rejectWithValue("Unexpected status code");
      }
      // localStorage.setItem("usersdatatoken", user.token);
    } catch (error) {
      console.error("Error", error);
    }
  }
);

const fetchProductsByUserId = createAsyncThunk(
  "product/fetchProductsByUserId",
  async (data, thunkApi) => {
    try {
      const products = await getProductsOfUser(data);
      console.log("My All Products", products);
      if (products.status === 200) {
        return thunkApi.fulfillWithValue(products.product);
      } else if (products.status === 400) {
        console.log("Authentication failed:", products.message);
        return thunkApi.rejectWithValue(products.message);
      } else {
        // Handle other status codes as needed
        console.error("Unexpected status code:", products.status);
        return thunkApi.rejectWithValue("Unexpected status code");
      }
      // localStorage.setItem("usersdatatoken", user.token);
    } catch (error) {
      console.error("Error", error);
    }
  }
);

const fetchUpdateProductByUser = createAsyncThunk(
  "product/fetchUpdateProductByUser",
  async (data, thunkApi) => {
    console.log("Product Slice New Product Update User", data);
    try {
      const newProduct = await updateProduct(data);
      console.log("Updated Product", newProduct);
      if (newProduct.status === 200) {
        return thunkApi.fulfillWithValue();
      } else if (newProduct.status === 400) {
        console.log("Update Product failed:", newProduct.message);
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

const fetchDeleteProductByUser = createAsyncThunk(
  "product/fetchUpdateProductByUser",
  async (data, thunkApi) => {
    console.log("Product Slice New Product Update User", data);

    // Display a confirmation dialog using window.confirm
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (confirmed) {
      try {
        // If user confirms, proceed with the deletion
        const deletedProduct = await deleteProduct(data);
        console.log("Deleted Product", deletedProduct);

        if (deletedProduct.status === 200) {
          // Show a success toast
          toast.success("Product deleted successfully");

          return thunkApi.fulfillWithValue(deletedProduct.product);
        } else if (deletedProduct.status === 400) {
          console.log("delete Product failed:", deletedProduct.message);
          return thunkApi.rejectWithValue(deletedProduct.message);
        } else {
          // Handle other status codes as needed
          console.error("Unexpected status code:", deletedProduct.status);
          return thunkApi.rejectWithValue("Unexpected status code");
        }
      } catch (error) {
        console.error("Error", error);
      }
    } else {
      // If user cancels, do nothing and return a fulfilled action
      return thunkApi.fulfillWithValue();
    }
  }
);

// const fetchProductByID = createAsyncThunk(
//   "product/fetchProduct",
//   async (id) => {
//     const res = await fetch(`${productApi}/getProduct/${id}`, requestOptions);
//     return res.json();
//   }
// );
// const fetchProductByCategory = createAsyncThunk(
//   "product/fetchProductByCategory",
//   async (category) => {
//     const res = await fetch(
//       `${productApi}/getProductByCategory/${category}`,
//       requestOptions
//     );
//     return res.json();
//   }
// );
// const deleteProduct = createAsyncThunk("product/deleteProduct", async (id) => {
//   const res = await fetch(`${productApi}/deleteProduct/${id}`);
//   return res.json();
// });
// const editProduct = createAsyncThunk("product/editProduct", async (id) => {
//   const res = await fetch(`${productApi}/editProduct/${id}`);
//   return res.json();
// });

const initialState = {
  products: [],
  filteredProducts: [],
  userProducts: [],
  newProduct: [],
  deletedProduct: [],
  updatedProduct: [],
  loading: false,
  error: null,
  newProductAdded: false,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    // add your non-async reducers here
  },
  extraReducers: {
    // add your async reducers here
    [fetchNewProduct.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchNewProduct.fulfilled]: (state, action) => {
      state.loading = false;
      state.newProductAdded = true; // Set this flag to true
      state.newProduct = action.payload;
    },
    [fetchNewProduct.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [fetchProducts.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
    [fetchProducts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [fetchProductBySearch.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchProductBySearch.fulfilled]: (state, action) => {
      state.loading = false;
      state.filteredProducts = action.payload;
    },
    [fetchProductBySearch.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [fetchProductByBrand.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchProductByBrand.fulfilled]: (state, action) => {
      state.loading = false;
      state.filteredProducts = action.payload;
    },
    [fetchProductByBrand.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [fetchProductsByCategory.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchProductsByCategory.fulfilled]: (state, action) => {
      state.loading = false;
      state.filteredProducts = action.payload;
    },
    [fetchProductsByCategory.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [fetchProductsByUserId.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchProductsByUserId.fulfilled]: (state, action) => {
      console.log("Fetched User Products Action Payload", action.payload);
      state.loading = false;
      state.userProducts = action.payload;
    },
    [fetchProductsByUserId.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [fetchUpdateProductByUser.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchUpdateProductByUser.fulfilled]: (state, action) => {
      console.log("Fetched User Products Action Payload", action.payload);
      state.loading = false;
      state.updatedProduct = action.payload;
    },
    [fetchUpdateProductByUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [fetchDeleteProductByUser.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchDeleteProductByUser.fulfilled]: (state, action) => {
      console.log("Fetched User Products Action Payload", action.payload);
      state.loading = false;
      // state.deletedProduct = action.payload;
    },
    [fetchDeleteProductByUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // [fetchProductByID.pending]: (state, action) => {
    //   state.loading = true;
    // },
    // [fetchProductByID.fulfilled]: (state, action) => {
    //   state.loading = false;
    //   state.products = action.payload;
    // },
    // [fetchProductByID.rejected]: (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload;
    // },
    // [fetchProductByCategory.pending]: (state, action) => {
    //   state.loading = true;
    // },
    // [fetchProductByCategory.fulfilled]: (state, action) => {
    //   state.loading = false;
    //   state.products = action.payload;
    // },
    // [fetchProductByCategory.rejected]: (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload;
    // },
    // [deleteProduct.pending]: (state, action) => {
    //   state.loading = true;
    // },
    // [deleteProduct.fulfilled]: (state, action) => {
    //   state.loading = false;
    //   state.products = action.payload;
    // },
    // [deleteProduct.rejected]: (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload;
    // },
  },
});

// Action creators
export const {
  // add your non-async action creators here
} = productSlice.actions;
// export your async action creators here
export {
  fetchProducts,
  fetchProductBySearch,
  fetchProductByBrand,
  fetchNewProduct,
  fetchProductsByCategory,
  fetchProductsByUserId,
  fetchUpdateProductByUser,
  fetchDeleteProductByUser,
  // fetchProductByID,
  // fetchProductByCategory,
  // deleteProduct,
  // editProduct,
};
// export states
export default productSlice.reducer;

const selectProductState = (state) => state.product; // selector function to get the product state.

// a selector that extracts the properties want to access
export const selectProducts = createSelector(
  selectProductState,
  (productState) => productState.products
);

export const selectProductsLoading = createSelector(
  selectProductState,
  (productState) => productState.loading
);

export const selectProductsError = createSelector(
  selectProductState,
  (productState) => productState.error
);

export const selectfilteredProducts = createSelector(
  selectProductState,
  (productState) => productState.filteredProducts
);
export const selectUserProducts = createSelector(
  selectProductState,
  (productState) => productState.userProducts
);
