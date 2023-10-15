import React from "react";
import FooterNavbar from "../footerNavbar/footerNavbar";
import "./NavBar.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar/SearchBar";

const Navbar = () => {
  const count = useSelector((state) => state.cart.count);
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="navbar_container">
          <Link to={"/"}>
            <div className="navbar_logo"></div>
          </Link>
          <div className="navbar_locator">
            <div className="navbar_locator_image"></div>

            <div className="navbar_location"> Faisalabad </div>
          </div>
          <div>
            {/* <input type="text" className="navbar_searchbox" /> */}
            <SearchBar />
          </div>
          <div className="navbar_signin">
            <div
              style={{
                fontSize: "14px",
              }}
            >
              Hellow Sign In
            </div>
            <div
              style={{
                fontWeight: "bold",
              }}
            >
              Accounts and Lists
            </div>
          </div>
          <div className="navbar_returns">
            <div
              style={{
                fontSize: "14px",
              }}
            >
              Returns
            </div>
            <div
              style={{
                fontWeight: "bold",
              }}
            >
              & Orders
            </div>
          </div>
          <div className="navbar_cart">
            <div className="navbar_cart_image"></div>
            <div className="navbar_cart_count">{count}</div>
            <div className="navbar_cart_text"> Cart</div>
          </div>
        </div>
        <div
          style={{
            marginTop: "60px",
          }}
        >
          <FooterNavbar />
        </div>
      </div>
    </>
  );
};

export default Navbar;
