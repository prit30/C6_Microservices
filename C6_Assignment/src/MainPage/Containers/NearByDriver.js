import React from "react";
import taxiImage from "./../../Images/Taxi Images.webp";
import { BsStarFill } from "react-icons/bs";
import { BsStarHalf } from "react-icons/bs";
import { BsStar } from "react-icons/bs";

import "./NearByDriver.css";

const NearByDriver = (props) => {
  var fullStars = [];
  var halfStars = [];
  var emptyStars = [];
  for (var i = 0; i < props.fullStar; i++) {
    fullStars.push(1);
  }
  for (var i = 0; i < props.halfStar; i++) {
    halfStars.push(1);
  }
  for (var i = 0; i < props.emptyStar; i++) {
    emptyStars.push(1);
  }

  var onClickHandler = () => {
    props.onDataHandler(props.name);
  };
  return (
    <div className="driverDeatilsContainer" onClick={onClickHandler}>
      <div className="leftSideContainer">
        <div className="imageContainer">
          <img src={taxiImage} />
        </div>
      </div>
      <div className="rightSideContainer">
        <h3>{props.driverName}</h3>
        <span>
          {fullStars.map(() => (
            <BsStarFill className="iconStyle" />
          ))}
          {halfStars.map(() => (
            <BsStarHalf className="iconStyle" />
          ))}
          {emptyStars.map(() => (
            <BsStar className="iconStyle" />
          ))}
        </span>
        <span>({props.reviewCounts})</span>
        <div className="awayDetails">
          <span>Estimated Cost :</span>
          <span>{props.awayDistance} ₹</span>
        </div>
        <div className="awayDetails">
          <span>Arrival Time :</span>
          <span>{props.arrivalTime} Mins</span>
        </div>
      </div>
    </div>
  );
};

export default NearByDriver;
