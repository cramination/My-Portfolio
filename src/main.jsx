import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./UI.css";

import Scene from "./Scene.jsx";
import UI from "./UI.jsx";
import RotatingModel from "./RotatingModel.jsx";
import RotatingModel2 from "./RotatingModel2.jsx";
import Carousel from "./Carousel.jsx";
import Carousel2 from "./Carousel2.jsx";
import "./main.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* 3D Scene */}
    <Scene />
    <UI />

    {/* Carousels */}
    <Carousel />
        {/* 3D Models Section */}
    <div className="rotating-models-wrapper">
      <h2 className="rotating-models-title">3D Models</h2>
      <div className="rotating-models-group">
        <RotatingModel />
        <RotatingModel2 />
      </div>
    </div>
    <Carousel2 />


  </StrictMode>
);
