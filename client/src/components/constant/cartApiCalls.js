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
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      Authorization: `Bearer ${userToken}`,
    },
  };

  const formData = new FormData();
  formData.append("data", item);
  formData.append("userId", userId); // Append the photo as a file
  formData.append("itemId", item._id); // Append the photo as a file
  formData.append("note", "Plz just add"); // Append the photo as a file
  formData.append("price", item.price); // Append the photo as a file
  formData.append("quantity", item.quantity); // Append the photo as a file

  requestOptions.body = formData;

  try {
    const response = await fetch(`${cartApi}/addToCart`, requestOptions);

    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      // Handle error response
      const errorData = await response.text(); // Read error response as text
      throw new Error(`API Error: ${response.status} - ${errorData}`);
    }
  } catch (error) {
    console.log("Error:", error);
    throw error;
  }
};
