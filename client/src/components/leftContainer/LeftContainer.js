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
  const [productCategory, setProductCategory] = useState("");
  const allProducts = useSelector(selectProducts);
  const filteredProducts = useSelector(selectfilteredProducts);

  console.log("PorductsCategory", productCategory);

  const products = filteredProducts || allProducts;
  useEffect(() => {
    // Update the productCategory state based on the first product's category
    if (products.length > 0) {
      setProductCategory(products[0].category);
    }
  }, [products]);
  const uniqueBrands = new Set();

  allProducts.forEach((product) => {
    if (product.category === productCategory) {
      uniqueBrands.add(product.brand);
    } else {
      console.log("These Barnds are not in your search", product.brand);
    }
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
