import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";

const useMainContent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchProducts();
    // console.log("data in useMainContent", data);
  }, []);

  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
  };
  const fetchProducts = async () => {
    await axios
      .get("http://localhost:8001/api/product/getAllProducts", requestOptions)
      .then((res) => {
        setData(res.data.products);
        // console.log("data in fetchProducts", res.data.products);
      });
  };
  return {
    data,
  };
};

export default useMainContent;
