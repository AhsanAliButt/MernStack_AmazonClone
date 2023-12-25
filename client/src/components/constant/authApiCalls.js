const authApi = process.env.REACT_APP_API_AUTH_ROUTE;
const clientUrl = "http://localhost:3000";
const requestOptions = {
  method: "POST",
  headers: {
    // Origin: clientUrl,
    // "Content-Type": "multipart/form-data",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
  // credentials: "include",
};

export const signInUser = async (credentials) => {
  const { email, password } = credentials;
  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);
  requestOptions.body = formData;
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
export const signInWithGoogle = async (token) => {
  console.log("Signing in with Google AUTHAPI", token);
  try {
    const response = await fetch(
      `${authApi}/getUserByToken/${token}`,
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
export const signUpUser = async (credentials) => {
  const {
    name,
    email,
    password,
    dob,
    tc,
    photo,
    country,
    recoveryEmail,
    firstName,
    lastName,
    zipCode,
  } = credentials;
  // requestOptions.body = JSON.stringify({
  //   name,
  //   email,
  //   password,
  //   age,
  //   tc,
  //   photo,
  //   country,
  //   recoveryEmail,
  //   firstName,
  //   lastName,
  //   zipCode,
  // });
  const formData = new FormData();
  formData.append("name", name);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("dob", dob);
  formData.append("tc", tc);
  formData.append("country", country);
  formData.append("recoveryEmail", recoveryEmail);
  formData.append("firstName", firstName);
  formData.append("lastName", lastName);
  formData.append("zipCode", zipCode);
  formData.append("photo", photo); // Append the photo as a file
  requestOptions.body = formData;
  try {
    console.log("Request Options:", requestOptions.body);

    const response = await fetch(`${authApi}/register`, requestOptions);

    const result = await response.json();

    console.log("Response Body:", result);

    return result; // API response contains a "userDetails" array
  } catch (error) {
    console.log("Error:", error);
    throw error;
  }
};

export const resetPassword = async (data) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
  };
  const { userId, newPassword, confirmNewPassword, token } = data;
  requestOptions.body = JSON.stringify({
    newPassword,
    confirmNewPassword,
  });
  try {
    console.log("Request Options:", requestOptions);

    const response = await fetch(
      `${authApi}/resetPassword/${userId}/${token}`,
      requestOptions
    );

    const result = await response.json();

    return result; // API response contains a "userDetails" array
  } catch (error) {
    console.log("Error:", error);
    throw error;
  }
};

export const resetPasswordEmail = async (email) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
  };
  requestOptions.body = JSON.stringify({
    email,
  });
  try {
    console.log("Request Options:", requestOptions);

    const response = await fetch(
      `${authApi}/sendEmailPasswordReset`,
      requestOptions
    );

    const result = await response.json();

    return result; // API response contains a "userDetails" array
  } catch (error) {
    console.log("Error:", error);
    throw error;
  }
};

export const updateUserDetails = async (credentials) => {
  const requestOptions = {
    method: "POST",
    headers: {
      // "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      Authorization: `Bearer ${credentials.token}`,
    },
  };
  console.log("Updating user details", credentials);
  const {
    name,
    email,
    password,
    dob,
    tc,
    photo,
    country,
    recoveryEmail,
    firstName,
    lastName,
    zipCode,
    _id,
  } = credentials;
  const formData = new FormData();
  formData.append("name", name);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("dob", dob);
  formData.append("tc", tc);
  formData.append("country", country);
  formData.append("recoveryEmail", recoveryEmail);
  formData.append("firstName", firstName);
  formData.append("lastName", lastName);
  formData.append("zipCode", zipCode);
  formData.append("photo", photo); // Append the photo as a file
  formData.append("userId", _id);
  requestOptions.body = formData;
  try {
    console.log("Request Options:", requestOptions.body);

    const response = await fetch(`${authApi}/updateUser`, requestOptions);

    const result = await response.json();

    console.log("Response Body:", result);

    return result; // API response contains a "userDetails" array
  } catch (error) {
    console.log("Error:", error);
    throw error;
  }
};
