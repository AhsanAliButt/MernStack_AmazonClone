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
export const getSearchedProducts = async (searchQuery) => {
  console.log("searchQueryINAPICALLS", searchQuery);
  try {
    const response = await fetch(
      `http://localhost:8001/api/product/getProductsBySearch/${searchQuery}`,
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
