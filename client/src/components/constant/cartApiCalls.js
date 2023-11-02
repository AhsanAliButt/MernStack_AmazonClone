const cartApi = process.env.REACT_APP_API_CART_ROUTE;

const requestOptions = {
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
};

export const addItemToCart = async (data, userId, userToken) => {
  console.log("CART API addItemToCart", data);
  console.log("CART API addItemToCart UserId", userId);
  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      Authorization: `Bearer ${userToken}`,
    },
  };

  const formData = new FormData();
  formData.append("data", data);
  formData.append("userId", userId); // Append the photo as a file
  requestOptions.body = formData;

  try {
    const response = await fetch(`${cartApi}/addToCart`, requestOptions);

    const result = await response.json();

    // console.log("Response Body of userProducts:", result);

    return result; // API response contains a "userDetails" array
  } catch (error) {
    console.log("Error:", error);
    throw error;
  }
};
