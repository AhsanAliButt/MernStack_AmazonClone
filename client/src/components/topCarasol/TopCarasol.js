import React from "react";
import "./topCarasol.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import LOGO from "../../assets/amazon.webp";
const TopCarasol = () => {
  return (
    <div className="carsol">
      <Carousel
        className="carsol"
        showThumbs={false}
        autoPlay
        showStatus={false}
        showIndicators={false}
        infiniteLoop
      >
        <div>
          <img src={LOGO} className=" banner_img " />
          <p className="legend">Legend 1</p>
        </div>
        <div>
          <img src={LOGO} className="banner_img" />
          <p className="legend">Legend 2</p>
        </div>
        <div>
          <img src={LOGO} className="banner_img" />
          <p className="legend">Legend 3</p>
        </div>
      </Carousel>
    </div>
  );
};

export default TopCarasol;
