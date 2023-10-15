import React, { useState, useEffect } from "react";
import "./leftContainer.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductByBrand,
  fetchProductBySearch,
  selectProducts,
  selectfilteredProducts,
} from "../../redux/slicers/productSlice";
import { Box } from "@mui/material";

const LeftContainer = ({ searchQuery, category }) => {
  const allProducts = useSelector(selectProducts);
  const filteredProducts = useSelector(selectfilteredProducts);

  const products = filteredProducts || allProducts;

  const uniqueBrands = new Set();

  products.forEach((product) => {
    uniqueBrands.add(product.brand);
  });

  const uniqueBrandsArray = [...uniqueBrands];
  const dispatch = useDispatch();

  const [selectedBrands, setSelectedBrands] = useState([]);

  // Use useEffect to dispatch selectedBrands whenever it changes
  useEffect(() => {
    if (selectedBrands.length > 0) {
      // Dispatch the selected brands to Redux whenever the checkboxes change
      dispatch(fetchProductByBrand(selectedBrands));
    } else {
      // If no brands are selected, fetch products based on the search query
      dispatch(fetchProductBySearch(searchQuery));
    }
  }, [selectedBrands, searchQuery]);

  const handleCheckboxChange = (event) => {
    const brand = event.target.value;

    if (event.target.checked) {
      setSelectedBrands((prevSelectedBrands) => [...prevSelectedBrands, brand]);
    } else {
      setSelectedBrands((prevSelectedBrands) =>
        prevSelectedBrands.filter((selectedBrand) => selectedBrand !== brand)
      );
    }
  };

  return (
    <Box className="leftSide_container">
      <Box className="leftSide_header_name">Brand Name</Box>
      {uniqueBrandsArray.map((brand, index) => {
        return (
          <Box className="leftSide_brand_names" key={index}>
            <label>
              <input
                type="checkbox"
                value={brand}
                onChange={handleCheckboxChange}
                checked={selectedBrands.includes(brand)}
              />{" "}
              {brand}
            </label>
          </Box>
        );
      })}
    </Box>
  );
};

export default LeftContainer;
