import React, { useState } from "react";
import "./Carousel2.css";

export default function Carousel2() {
  const slides = [
    {
      id: 1,
      image: "/My-Portfolio/assets/Thumbnails/Artschool Thumbnail_00000.png",
      link: "https://www.youtube.com/watch?v=CuzU1QDcAl0",
    },
    {
      id: 2,
      image: "/My-Portfolio/assets/Thumbnails/Comp 1 (0-00-06-02).png",
      link: "https://www.youtube.com/watch?v=njrd7zqXh2U",
    },
    {
      id: 3,
      image: "/My-Portfolio/assets/Thumbnails/Sail (0-02-29-25).png",
      link: "https://www.youtube.com/watch?v=d5JUco1ija4",
    },
    {
      id: 5,
      image: "/My-Portfolio/assets/Thumbnails/Car trick (0-00-01-11).png",
      link: "https://www.youtube.com/watch?v=lm6biZb0it8",
    },
  ];

  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="carousel-wrapper2">
      <h2 className="carousel-title2">Extra Projects!</h2>
      <div className="carousel-container2">
        <div className="carousel-content2">
          {slides.map((slide, index) => (
            <a
              key={slide.id}
              href={slide.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`carousel-slide2 ${
                index === current ? "active2" : "inactive2"
              }`}
            >
              <img
                src={slide.image}
                alt={`Slide ${slide.id}`}
                className="carousel-image2"
              />
            </a>
          ))}
        </div>

        <div className="carousel-buttons2">
          <button onClick={prevSlide}>⟨ Prev</button>
          <button onClick={nextSlide}>Next ⟩</button>
        </div>

        <div className="carousel-indicators2">
          {slides.map((_, index) => (
            <span
              key={index}
              className={`dot2 ${index === current ? "active-dot2" : ""}`}
              onClick={() => setCurrent(index)}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
}
