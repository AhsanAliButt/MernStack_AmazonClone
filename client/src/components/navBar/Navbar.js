import React from "react";
import FooterNavbar from "../footerNavbar/footerNavbar";
import "./NavBar.css";

const Navbar = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className="navbar_container">
        <div className="navbar_logo"></div>
        <div className="navbar_locator">
          <div className="navbar_locator_image"></div>
          <div className="navbar_location"> Faisalabad </div>
        </div>
        <div className="navbar_searchcontainer">
          <div>
            <select className="navbar_dropdown">
              <option value="">All</option>
              <option value="">Books</option>
              <option value="">baby</option>
              <option value="">Beauty</option>
              <option value="">clothes</option>
              <option value="">All</option>
            </select>
          </div>
          <div>
            <input type="text" className="navbar_searchbox" />
          </div>
          <div className="search_icon_container">
            <div className="navbar_searchicon" />
          </div>
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
          <div className="navbar_cart_count">0</div>
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
  );
};

export default Navbar;
