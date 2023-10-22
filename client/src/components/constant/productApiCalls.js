import { useSelector } from "react-redux";
import { selectToken } from "../../redux/slicers/authSlice";

const productApi = process.env.REACT_APP_API_PRODUCT_ROUTE;

const requestOptions = {
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
};

export const getAllProducts = async () => {
  try {
    const response = await fetch(
      `${productApi}/getAllProducts`,
      requestOptions
    );
    const result = await response.json();
    return result.products; // API response contains a "products" array
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};
export const getSearchedProducts = async (data) => {
  console.log("searchQuery", data.searchQuery);
  console.log("category Query", data.category);
  try {
    const response = await fetch(
      `http://localhost:8001/api/product/getProductsBySearch/${data.searchQuery}`,
      requestOptions
    );
    const result = await response.json();
    // console.log("SEARCHED RESULT", result);
    return result.product; // API response contains a "products" array
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};
export const getBrandSearchedProducts = async (brand) => {
  console.log("BrandQueryAPICALLS", brand);
  try {
    const response = await fetch(
      `http://localhost:8001/api/product/getProductsByBrand/${brand}`,
      requestOptions
    );
    const result = await response.json();
    console.log("Brand RESULT", result);
    return result.products; // API response contains a "products" array
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};
export const getCategorisedProducts = async (category) => {
  console.log("Category in Api calls", category);
  try {
    const response = await fetch(
      `${productApi}/getProductsByCategory/${category}`,
      requestOptions
    );
    const result = await response.json();
    console.log("Brand RESULT", result);
    return result.products; // API response contains a "products" array
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};
export const addProduct = async (data) => {
  const requestOptions = {
    method: "POST",
    headers: {
      // "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      Authorization: `Bearer ${data.authToken}`,
    },
  };
  const {
    name,
    price,
    description,
    category,
    brand,
    company,
    stock,
    picture,
    userId,
  } = data?.productData;

  const formData = new FormData();
  formData.append("name", name);
  formData.append("price", price);
  formData.append("description", description);
  formData.append("category", category);
  formData.append("brand", brand);
  formData.append("company", company);
  formData.append("stock", stock);
  formData.append("photo", picture); // Append the photo as a file
  formData.append("userId", userId); // Append the photo as a file
  requestOptions.body = formData;
  try {
    console.log("Request Options:", requestOptions.body);

    const response = await fetch(`${productApi}/addProduct`, requestOptions);

    const result = await response.json();

    console.log("Response Body:", result);

    return result; // API response contains a "userDetails" array
  } catch (error) {
    console.log("Error:", error);
    throw error;
  }
};

export const getProductsOfUser = async (data) => {
  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      Authorization: `Bearer ${data.authToken}`,
    },
  };
  try {
    const response = await fetch(
      `${productApi}/getUserProducts/${data.userId}`,
      requestOptions
    );

    const result = await response.json();

    // console.log("Response Body of userProducts:", result);

    return result; // API response contains a "userDetails" array
  } catch (error) {
    console.log("Error:", error);
    throw error;
  }
};
