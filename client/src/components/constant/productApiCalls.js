import { useSelector } from "react-redux";
import { selectToken } from "../../redux/slicers/authSlice";

const productApi = process.env.REACT_APP_API_PRODUCT_ROUTE;
const orderApi = process.env.REACT_APP_API_ORDER_ROUTE;

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
  console.log(
    "search Query IN PRODUCT API",
    data.searchQuery,
    "Category in Api Call",
    data.category
  );
  // console.log("category Query", data.category);
  try {
    const response = await fetch(
      `http://localhost:8001/api/product/getProductsBySearch/${
        data.searchQuery || data.category
      }`,
      requestOptions
    );
    const result = await response.json();
    console.log("SEARCHED RESULT FROM NODE JS", result);
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

export const updateProduct = async (data) => {
  const requestOptions = {
    method: "PUT",
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
  const id = data.productData.id;

  console.log("Product", id);

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

    const response = await fetch(
      `${productApi}/updateProduct/${id}`,
      requestOptions
    );

    const result = await response.json();

    console.log("Response Body:", result);

    return result; // API response contains a "userDetails" array
  } catch (error) {
    console.log("Error:", error);
    throw error;
  }
};

export const deleteProduct = async (data) => {
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      Authorization: `Bearer ${data.authToken}`,
    },
  };
  try {
    const response = await fetch(
      `${productApi}/deleteProduct/${data.id}`,
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

export const createPayment = async (data, user) => {
  const { stripe, cart } = data;
  console.log("Create Payment data for stripe in ProductApi", data);
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // "Access-Control-Allow-Origin": "*",
      // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
    body: JSON.stringify({ products: cart, user: user }), // Convert cart data to JSON and set it as the request body
  };

  try {
    const response = await fetch(`${productApi}/createPayment`, requestOptions);

    const session = await response.json();
    console.log("response from api ", session);

    // console.log("Response Body of userProducts:", result);
    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });

    return result; // API response contains a "userDetails" array
  } catch (error) {
    console.log("Error:", error);
    throw error;
  }
};
