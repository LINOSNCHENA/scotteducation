import React from "react";
import "./ThreeCircles.css";

const ThreeCircles = () => {
  return (
    <div className="circles-container">
      <div className="circle-item">
        <div className="circle">
          <span>1</span>
        </div>
        <p className="circle-text">To provide high quality, cost effective, and scalable IT Solution.</p>
      </div>

      <div className="circle-item">
        <div className="circle">
          <span>2</span>
        </div>
        <p className="circle-text">To build long-term client relationships through trust, expertise, and exceptional service.</p>
      </div>

      <div className="circle-item">
        <div className="circle">
          <span>3</span>
        </div>
        <p className="circle-text">To drive business growth by leveraging the latest advancements in technology.</p>
      </div>
    </div>
  );
};

export default ThreeCircles;
