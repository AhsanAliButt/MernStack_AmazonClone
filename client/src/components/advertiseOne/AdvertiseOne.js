import React from "react";
import "./AdvertiseOne.css";
import useStates from "../hooks/useStates";

const AdvertiseOne = ({ data }) => {
  // console.log("data in advertise one", data?._id);
  const { allProducts } = useStates();
  return (
    <>
      <div className="advertiseOne_container">
        <div className="advertise_header_text"> Gaming Accessories </div>
        <div className="advertiseOne_main">
          {" "}
          <img
            src="https://ik.imagekit.io/amazonClone/V238940049_IN_PC_BAU_Edit_Creation_Laptops2X._SY608_CB667377204__5ufpwX876.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1660049600683"
            alt=""
            width={260}
            height={220}
          />
        </div>
        <div className="advertiseOne_footer">
          <a
            href="/"
            style={{
              textDecoration: "none",
            }}
          >
            {" "}
            See more
          </a>
        </div>
      </div>
    </>
  );
};

export default AdvertiseOne;
