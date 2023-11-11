import React, { useState, useEffect } from 'react';
import './index.css'; // Import your CSS styles

const images = [
    require("../../../assets/images/carousel/stats.png"),
    require("../../../assets/images/carousel/redeem.png"),
    require("../../../assets/images/carousel/detect.png"),
    require("../../../assets/images/carousel/about.png"),
];

function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="carousel-container">
      <div className="carousel-slide">
        <div className="slide-inner">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Image ${index + 1}`}
              className={index === currentIndex ? 'active' : 'inactive'}
            />
          ))}
        </div>
      </div>
      <div className="dots-container">
        {images.map((i, index) => (
          <div
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}>
          </div>
        ))}
        </div>
        </div>
  );
}

export default Carousel;
