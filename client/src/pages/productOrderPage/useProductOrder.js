import React, { useEffect, useState } from "react";

const useProductOrder = () => {
  const [data, setData] = useState([]);
  //   console.log("data in useProduct", data);
  useEffect(() => {
    fetchProducts();
  }, []);

  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
  };
  const fetchProducts = async () => {
    fetch("http://localhost:8001/api/product/getAllProducts", requestOptions)
      .then((response) => response.json())
      .then((result) => setData(result.products))
      .catch((error) => console.log("error", error));
  };
  return {
    data,
  };
};

export default useProductOrder;
