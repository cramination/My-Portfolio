import React, { useState } from "react";
import "./Carousel.css";

export default function Carousel() {
  const slides = [
    {
      id: 1,
      image: "/My-Portfolio/assets/Thumbnails/Portfolio (0-00-12-02).png",
      link: "https://www.youtube.com/watch?v=Jr2QXw3Fll0",
    },
    {
      id: 2,
      image: "/My-Portfolio/assets/Thumbnails/Graphics (0-00-11-44).png",
      link: "https://www.youtube.com/shorts/3xMyzWp0p_w",
    },
    {
      id: 3,
      image: "/My-Portfolio/assets/Thumbnails/Comp 1 (0-00-50-23).png",
      link: "https://www.youtube.com/watch?v=EoHY9Jb_F5k",
    },
    {
      id: 5,
      image: "/My-Portfolio/assets/Thumbnails/Brother_sports (0-00-25-29).png",
      link: "https://www.youtube.com/watch?v=w1lm_8BKlWs",
    },
  ];

  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="carousel-wrapper">
  <h2 className="carousel-title">My Work</h2>  {/* Title outside carousel-container */}
  <div className="carousel-container">
    <div className="carousel-content">
      {slides.map((slide, index) => (
        <a
          key={slide.id}
          href={slide.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`carousel-slide ${
            index === current ? "active" : "inactive"
          }`}
        >
          <img
            src={slide.image}
            alt={`Slide ${slide.id}`}
            className="carousel-image"
          />
        </a>
      ))}
    </div>

    <div className="carousel-buttons">
      <button onClick={prevSlide}>⟨ Prev</button>
      <button onClick={nextSlide}>Next ⟩</button>
    </div>

    <div className="carousel-indicators">
      {slides.map((_, index) => (
        <span
          key={index}
          className={`dot ${index === current ? "active-dot" : ""}`}
          onClick={() => setCurrent(index)}
        ></span>
      ))}
    </div>
  </div>
</div>

  );
}
