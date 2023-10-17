const authApi = process.env.REACT_APP_API_AUTH_ROUTE;
const requestOptions = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
};

export const signInUser = async (credentials) => {
  const { email, password } = credentials;
  requestOptions.body = JSON.stringify({ email, password });
  try {
    console.log("Request URL:", `${authApi}/login`);
    console.log("Request Options:", requestOptions);

    const response = await fetch(`${authApi}/login`, requestOptions);

    const result = await response.json();

    console.log("Response Body:", result);

    return result; // API response contains a "userDetails" array
  } catch (error) {
    console.log("Error:", error);
    throw error;
  }
};
export const signUpUser = async (credentials) => {
  const { name, email, password, age, tc, photo, country, recoveryemail } =
    credentials;
  requestOptions.body = JSON.stringify({
    name,
    email,
    password,
    age,
    tc,
    photo,
    country,
    recoveryemail,
  });
  try {
    console.log("Request Options:", requestOptions);

    const response = await fetch(`${authApi}/register`, requestOptions);

    const result = await response.json();

    console.log("Response Body:", result);

    return result; // API response contains a "userDetails" array
  } catch (error) {
    console.log("Error:", error);
    throw error;
  }
};
