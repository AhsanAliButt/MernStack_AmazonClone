import React, { useState } from "react";
import "../NavBar.css";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts } from "../../../redux/slicers/productSlice";
const SearchBar = () => {
  const navigate = useNavigate(); // Initialize React Router's useHistory

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const searchHistory = ["Games", "Mobiles", "VideoGames"];
  const allProducts = useSelector(selectProducts);

  // Filter out duplicate categories from allProducts
  const uniqueCategories = [
    ...new Set(allProducts.map((product) => product.category)),
  ];

  console.log("Categories: " + selectedCategory);

  const handleInputChange = (event) => {
    const input = event.target.value;
    setSearchTerm(input);

    if (input === "") {
      setSearchResults([]);
      setShowDropdown(true);
    } else {
      const filteredResults = searchHistory.filter((result) =>
        result.toLowerCase().includes(input.toLowerCase())
      );
      setSearchResults(filteredResults);
      setShowDropdown(true);
    }
  };

  const handleResultClick = (result) => {
    console.log("Result", result);
    setSearchTerm(result);
    setSearchResults([]);
    setShowDropdown(false);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSearch = () => {
    navigate(`/search?term=${searchTerm}&category=${selectedCategory}`);
  };

  const handleInputFocus = () => {
    if (searchTerm === "") {
      setShowDropdown(true);
    }
  };

  const handleInputBlur = () => {
    setShowDropdown(false);
  };

  return (
    <Box>
      <Box className="navbar_searchcontainer">
        <Box>
          <select className="navbar_dropdown" onChange={handleCategoryChange}>
            <option value="">All</option>
            {uniqueCategories.map((product, index) => {
              return (
                <option key={index} value={product}>
                  {product}
                </option>
              );
            })}
          </select>
        </Box>
        <Box>
          <input
            type="text"
            className="navbar_searchbox"
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
          {showDropdown && searchResults.length > 0 && (
            <Box className="search-suggestions">
              {searchResults.map((result, index) => (
                <Box
                  key={index}
                  onClick={() => handleResultClick(result)}
                  style={{
                    color: "primary",
                    backgroundColor: "rgb(255, 255, 255)",
                    width: "100%",
                    borderRadius: "5px",
                  }}
                >
                  <Typography>{result}</Typography>
                </Box>
              ))}
            </Box>
          )}
        </Box>
        <Box className="search_icon_container">
          <button className="navbar_searchicon" onClick={handleSearch}></button>
        </Box>
      </Box>
    </Box>
  );
};

export default SearchBar;
