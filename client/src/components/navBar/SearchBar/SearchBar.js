import React, { useState } from "react";
import "../NavBar.css";
import { Box, Button, InputBase, MenuItem, Typography } from "@mui/material";
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

  // console.log("Categories: " + selectedCategory);

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
    // console.log("Result", result);
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
      <Box
        className="navbar_searchcontainer"
        display={"flex"}
        margin={"0 auto"}
      >
        <Box
          sx={{
            display: {
              xs: "none",
              sm: "block",
            },
            height: {
              xs: "20px",
              sm: "36px",
              md: "35px",
              lg: "43px",
            },
          }}
        >
          <select
            className="navbar_dropdown"
            value={selectedCategory}
            onChange={handleCategoryChange}
            // style={{
            //   sm: "20px",
            // }}
          >
            <option value="All">All</option>
            {uniqueCategories.map((product, index) => {
              return (
                <option key={index} value={product}>
                  {product}
                </option>
              );
            })}
          </select>
        </Box>
        {/* <Box>
          <Select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="navbar_dropdown"
            sx={{
              height: "48px",
              backgroundColor: "white",
            }}
          >
            <MenuItem value="">All</MenuItem>
            {uniqueCategories.map((product, index) => (
              <MenuItem key={index} value={product}>
                {product}
              </MenuItem>
            ))}
          </Select>
        </Box> */}
        <Box>
          <InputBase
            type="text"
            className="navbar_searchbox"
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            sx={{
              backgroundColor: "white",
              marginTop: "8px",
              height: {
                xs: "20px",
                sm: "36px",
                md: "35px",
                lg: "43px",
              },
              width: {
                xs: "18vw",
                sm: "25vw",
                md: "30vw",
                lg: "50vw",
              },
            }}
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
        <Box
          className="search_icon_container"
          onClick={handleSearch}
          sx={{
            height: {
              xs: "20px",
              sm: "36px",
              md: "35px",
              lg: "43px",
            },
          }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box className="navbar_searchicon"></Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SearchBar;
