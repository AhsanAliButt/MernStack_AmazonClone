import React, { useEffect } from "react";
import Swiper from "swiper";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Link } from "react-router-dom";

const FeedCarsol = ({ allProducts }) => {
  useEffect(() => {
    const swiper = new Swiper(".swiper", {
      modules: [Autoplay, Navigation],
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      slidesPerView: "7", // Show all images in the view
      spaceBetween: 10, // Add space between images (adjust as needed)
      lazy: true, // Enable lazy loading
      autoplay: {
        delay: 2000, // Adjust the delay (in milliseconds) for auto-play
      },
    });
  }, []);

  return (
    <div className="swiper">
      <div className="swiper-wrapper">
        {allProducts.map((product, index) => (
          <div className="swiper-slide" key={index}>
            <Link
              to={"/productOrderPage/" + product._id}
              // className="product_container"
            >
              <img
                style={{
                  height: "100px",
                }}
                src={product.imageUrl}
                alt={`Slide ${index + 1}`}
              />
            </Link>
          </div>
        ))}
      </div>
      <div className="swiper-button-prev"></div>
      <div className="swiper-button-next"></div>
    </div>
  );
};

export default FeedCarsol;
