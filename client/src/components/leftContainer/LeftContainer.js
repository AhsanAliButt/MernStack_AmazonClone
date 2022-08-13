import React from "react";
import "./leftContainer.css";

const LeftContainer = () => {
  return (
    <div className="leftSide_container">
      <div className="leftSide_header_name">Brnd Name</div>
      <div className="leftSide_brand_names">
        <label>
          <input type="checkbox" value="M1" /> M1
        </label>
        <label>
          <input type="checkbox" value="Apple" /> Apple
        </label>
        <label>
          <input type="checkbox" value="Samsung" /> Samsung
        </label>
        <label>
          <input type="checkbox" value="Oppo" /> Oppo
        </label>
        <label>
          <input type="checkbox" value="Huawei" /> Huawei
        </label>
        <label>
          <input type="checkbox" value="HTC" /> HTC
        </label>
      </div>
    </div>
  );
};

export default LeftContainer;
