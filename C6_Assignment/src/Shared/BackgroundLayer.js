import React from "react";
import "./BackgroundLayer.css";

const BackgroundLayer = (props) => {
  return (
    <div className={`backgroundLayer__bg ${props.className}`}>
      {props.children}
    </div>
  );
};

export default BackgroundLayer;
