const authApi = process.env.REACT_APP_API_AUTH_ROUTE;
const requestOptions = {
  method: "POST",
  headers: {
    // "Content-Type": "multipart/form-data",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
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
