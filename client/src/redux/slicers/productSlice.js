import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createSelector } from "reselect"; // its normaly use to memorize the selectors used in the component
import {
  getAllProducts,
  getSearchedProducts,
  getBrandSearchedProducts,
} from "../../components/constant/productApiCalls";

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
  async (searchQuery) => {
    console.log("searchQuery", searchQuery);
    try {
      const products = await getSearchedProducts(searchQuery);
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
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    // add your non-async reducers here
  },
  extraReducers: {
    // add your async reducers here
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
  // fetchProductByID,
  // fetchProductByCategory,
  // deleteProduct,
  // editProduct,
};
// export states
export default productSlice.reducer;

const selectProductState = (state) => state.product; // Define a selector function to get the product state.

// Create a selector that extracts the properties want to access
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
