const cartApi = process.env.REACT_APP_API_CART_ROUTE;

const requestOptions = {
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
};

export const addItemToCart = async (item, userId, userToken) => {
  console.log("CART API addItemToCart", item._id, "quantity", item.quantity);
  console.log("CART API addItemToCart UserId", userId);
  console.log("CART API addItemToCart UserToken", userToken);
  const requestOptions = {
    method: "POST", // Use POST method for sending data
    headers: {
      // "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      Authorization: `Bearer ${userToken}`,
    },
  };

  const formData = new FormData();
  formData.append("userId", userId); // Send User ID to Backend API
  formData.append("itemId", item._id); // Send ItemId to Backend API
  formData.append("note", "Plz just add"); // Send Note to Backend API
  formData.append("price", item.price); // Send Price to Backend API
  formData.append("quantity", 1); // Send Default Quantity to Backend API

  requestOptions.body = formData;

  try {
    const response = await fetch(`${cartApi}/addToCart`, requestOptions);
    const result = await response.json();
    console.log("Cart Result", result);
    return result.updatedCart; // API response contains a "products" array
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};
export const increaseQuantityOfCart = async (item, userId, userToken) => {
  // console.log("CART API DeleteItemToCart", item, "quantity", item.quantity);
  // console.log("CART API addItemToCart UserId", userId);
  // console.log("CART API addItemToCart UserToken", userToken);
  const requestOptions = {
    method: "PATCH", // Use Patch method for sending data
    headers: {
      // "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      Authorization: `Bearer ${userToken}`,
    },
  };

  const formData = new FormData();
  formData.append("userId", userId); // Send User ID to Backend API
  formData.append("productId", item); // Send Product ID to Backend API
  formData.append("note", "Plz just increase"); // Send Note to Backend API

  requestOptions.body = formData;

  try {
    const response = await fetch(`${cartApi}/increaseQuantity`, requestOptions);
    const result = await response.json();
    console.log("Cart Result", result);
    return result.updatedCart; // API response contains a "products" array
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};
export const decreaseQuantityOfCart = async (item, userId, userToken) => {
  // console.log("CART API DeleteItemToCart", item, "quantity", item.quantity);
  // console.log("CART API addItemToCart UserId", userId);
  // console.log("CART API addItemToCart UserToken", userToken);
  const requestOptions = {
    method: "PATCH", // Use Patch method for sending data
    headers: {
      // "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      Authorization: `Bearer ${userToken}`,
    },
  };

  const formData = new FormData();
  formData.append("userId", userId); // Send User ID to Backend API
  formData.append("productId", item); // Send Product ID to Backend API
  formData.append("note", "Plz just decrease"); // Send Note to Backend API

  requestOptions.body = formData;

  try {
    const response = await fetch(`${cartApi}/decreaseQuantity`, requestOptions);
    const result = await response.json();
    console.log("Cart Result", result);
    return result.updatedCart; // API response contains a "products" array
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};

export const removeItemFromCart = async (item, userId, userToken) => {
  console.log("CART API DeleteItemToCart", item);
  // console.log("CART API addItemToCart UserId", userId);
  // console.log("CART API addItemToCart UserToken", userToken);
  const requestOptions = {
    method: "DELETE", // Use DELETE method for delete product from cart
    headers: {
      // "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      Authorization: `Bearer ${userToken}`,
    },
  };

  const formData = new FormData();
  formData.append("userId", userId); // Send User ID to Backend API
  formData.append("productId", item); // Send Product ID to Backend API
  formData.append("note", "Plz just decrease"); // Send Note to Backend API

  requestOptions.body = formData;

  try {
    const response = await fetch(
      `${cartApi}/removeItemFromCart`,
      requestOptions
    );
    const result = await response.json();
    console.log("Cart Result", result);
    return result.updatedCart; // API response contains a "products" array
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};
