import React, { useEffect, useRef, useState } from "react";
import {
  useJsApiLoader,
  GoogleMap,
  MarkerF,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";

import "./MainPage.css";
import BackgroundLayer from "../Shared/BackgroundLayer";
import NearByDriver from "./Containers/NearByDriver";
import driverList from "./Data/DummyDriverRecords";
import reviewList from "./Data/DummyReviewRecords";

import Countdown from "react-countdown";
import { Rating } from "react-simple-star-rating";

import { FaLessThan } from "react-icons/fa";
import { FaGreaterThan } from "react-icons/fa";

import Swal from "sweetalert2";

// const center = { lat: 20.3347045, lng: 72.9384284 };

const MainPage = () => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [origin, setOrigin] = useState("");
  const [directionResponse, setDirectionResponse] = useState(null);
  const [hideDirectionResponse, setHidedirectionResponse] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState([]);
  const [sortedArrayList, setSortedArrayList] = useState([...driverList]);
  const [showReview, setShowReview] = useState(false);
  const [rideBook, setRideBook] = useState(false);

  const [nearByDrivers, setNearByDrivers] = useState(false);
  const [driverDetails, setDriverDetails] = useState(false);
  const [bookedRide, setBookedRide] = useState(false);

  const [otp, setOtp] = useState("");

  const [enableOTPClick, setEnableOTPClick] = useState(false);
  const [changeOTP, setChangeOTP] = useState(false);
  const [feedback, setFeedback] = useState(false);

  const distanceButtonRef = useRef(false);
  const timeButtonRef = useRef(false);

  const originRef = useRef();
  const destinationRef = useRef();

  async function calculateRouteHandler() {
    if (originRef.current.value === "" || destinationRef.current.value === "") {
      return;
    }
    // eslint-disable-next-line no-undef
    const directionServices = new google.maps.DirectionsService();
    const result = await directionServices.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionResponse(result);
    setOrigin(originRef.current.value);
    setNearByDrivers(true);
  }

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_MAP,
    libraries: ["places"],
  });

  const options = {
    enableHighAccuracy: false,
    timeout: 5000,
    maximumAge: 0,
  };

  function success(position) {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
  }

  function error() {
    console.log("Unable to retrieve your location");
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error, options);
  } else {
    console.log("Geolocation not supported");
  }

  if (!isLoaded) {
    return <div className="loader"></div>;
  }

  var clearInputHandler = () => {
    setDirectionResponse(null);
    originRef.current.value = "";
    destinationRef.current.value = "";
    setNearByDrivers(false);
    setDriverDetails(false);
  };

  const center = { lat: latitude, lng: longitude };
  // const center = { lat: 20.3347045, lng: 72.9384284 };

  var showDetail = (id) => {
    console.log("🚀 ~ file: MainPage.js:87 ~ showDetail ~ id:", id);
    setSelectedDriver(driverList.filter((object) => object.id == id));
    setRideBook(false);
    setDriverDetails(true);
  };

  var reviewClickHandler = () => {
    if (showReview == false) {
      setShowReview(true);
    } else {
      setShowReview(false);
    }
  };

  var bookRideHandler = (e) => {
    var digits = "0123456789";
    var OTP = "";
    for (var i = 0; i < e; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    console.log("🚀 ~ file: MainPage.js:123 ~ bookRideHandler ~ OTP:", OTP);
    setOtp(OTP);
    // console.log(otp);

    Swal.fire({
      title: "Are you sure?",
      text: "You can cancel a ride before starting.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Confirmed!", "Your ride has been booked.", "success").then(
          (result) => {
            if (result.isConfirmed) {
              setNearByDrivers(false);
              setDriverDetails(false);
              setBookedRide(true);
            }
          }
        );
      }
    });
  };

  var cancelClickHandler = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "Cancelled!",
          "Your ride has been cancelled.",
          "success"
        ).then((result) => {
          if (result.isConfirmed) {
            setBookedRide(false);
            setDirectionResponse(null);
            originRef.current.value = "";
            destinationRef.current.value = "";
          }
        });
      }
    });
  };

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      Swal.fire({
        title: "Share OTP",
        text: "Share OTP to confirm the ride",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, confirm it!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            "Confirmed!",
            "Your ride has been confirmed.",
            "success"
          ).then(() => {
            setEnableOTPClick(true);
            setTimeout(submitReview, 10000);
          });
        }
      });
    } else {
      return (
        <span>
          {minutes}:{seconds}
        </span>
      );
    }
  };

  var submitReview = () => {
    Swal.fire({
      title: "FeedBack",
      text: "Would you like to give feedback !!",
      icon: "question",
      confirmButtonColor: "#ffcc00",
      confirmButtonText: "OK",
    }).then((result) => {
      if (result.isConfirmed) {
        setChangeOTP(true);
      }
    });
  };

  var giveFeedbackHandler = () => {
    setFeedback(true);
  };

  var endTheRideHandler = () => {
    Swal.fire({
      title: "Successful Feedback",
      text: "Your feedback is successfully stored",
      icon: "success",
      confirmButtonColor: "#ffcc00",
      confirmButtonText: "OK",
    }).then((result) => {
      if (result.isConfirmed) {
        setFeedback(false);
        setBookedRide(false);
        clearInputHandler();
      }
    });
  };

  return (
    <>
      <GoogleMap
        className="googleMapStyle"
        center={origin ? origin : center}
        mapContainerStyle={{ width: "100vw", height: "100vh" }}
        zoom={15}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
        // onLoad={(map) => setMap(map)}
      >
        {directionResponse && (
          <DirectionsRenderer directions={directionResponse} />
        )}
      </GoogleMap>
      <div className="bookingContainer">
        <div className="bookingInputGroup">
          <Autocomplete>
            <input placeholder="Origin" type="text" ref={originRef} />
          </Autocomplete>
          <Autocomplete>
            <input placeholder="Destination" type="text" ref={destinationRef} />
          </Autocomplete>
        </div>
        <div className="buttonGroups">
          <button className="calculateButton" onClick={calculateRouteHandler}>
            Calculate Route
          </button>
          <button className="clearButton" onClick={clearInputHandler}>
            X
          </button>
        </div>
      </div>
      {nearByDrivers ? (
        <div className="rideOptionContainer">
          <div className="sortingOption">
            <span>Sort By :</span>
            <button ref={distanceButtonRef}>Cost</button>
            <button ref={timeButtonRef}>Time</button>
          </div>
          <div className="driverDetailsContainer">
            {sortedArrayList.map((driver) => (
              <NearByDriver
                key={driver.id}
                driverName={driver.driverName}
                fullStar={driver.fullStar}
                halfStar={driver.halfStar}
                emptyStar={driver.emptyStar}
                reviewCounts={driver.reviewCounts}
                awayDistance={driver.awayDistance}
                arrivalTime={driver.arrivalTime}
                onDataHandler={() => showDetail(driver.id)}
              />
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
      {driverDetails ? (
        <div className="driverContainer">
          {selectedDriver.map((driver1) => (
            <NearByDriver
              key={driver1.id}
              driverName={driver1.driverName}
              fullStar={driver1.fullStar}
              halfStar={driver1.halfStar}
              emptyStar={driver1.emptyStar}
              reviewCounts={driver1.reviewCounts}
              awayDistance={driver1.awayDistance}
              arrivalTime={driver1.arrivalTime}
            />
          ))}
          {selectedDriver.length > 0 ? (
            <button className="reviewButton" onClick={reviewClickHandler}>
              Reviews
            </button>
          ) : (
            <></>
          )}
          {showReview ? (
            <div className="reviewContainer">
              <div className="review">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aliquam at volutpat tellus. Maecenas bibendum sem dui, sit
                  amet consectetur lectus efficitur ornare.
                </p>
              </div>
              <div className="reviewControl">
                <span>
                  <FaLessThan />
                </span>
                <span>
                  <FaGreaterThan />
                </span>
              </div>
            </div>
          ) : (
            <></>
          )}
          <button
            className="reviewButton bookRideButton"
            onClick={() => bookRideHandler(6)}
          >
            Book Ride
          </button>
        </div>
      ) : (
        <></>
      )}
      {bookedRide ? (
        <>
          <div className="finalBookedContainer">
            {selectedDriver.map((driver1) => (
              <NearByDriver
                key={driver1.id}
                driverName={driver1.driverName}
                fullStar={driver1.fullStar}
                halfStar={driver1.halfStar}
                emptyStar={driver1.emptyStar}
                reviewCounts={driver1.reviewCounts}
                awayDistance={driver1.awayDistance}
                arrivalTime={driver1.arrivalTime}
              />
            ))}
            {changeOTP ? (
              <button
                className="reviewButton bookRideButton"
                onClick={giveFeedbackHandler}
              >
                Give FeedBack
              </button>
            ) : (
              <button className="reviewButton bookRideButton">
                OTP : {otp}
              </button>
            )}

            {enableOTPClick ? (
              <></>
            ) : (
              <button
                className="reviewButton cancelButton"
                onClick={cancelClickHandler}
              >
                Cancel Ride
              </button>
            )}
            <span class="badge">
              <Countdown
                date={Date.now() + 10000}
                renderer={renderer}
                autoStart={true}
              />
            </span>
          </div>
        </>
      ) : (
        <></>
      )}
      {feedback && (
        <div className="feedbackContainer">
          <h1>Give us feedback</h1>
          <Rating className="ratingStars" />
          <h4>Optional</h4>
          <textarea cols={40} rows={4} />
          <button
            className="reviewButton bookRideButton"
            onClick={endTheRideHandler}
          >
            SUBMIT
          </button>
        </div>
      )}
    </>
  );
};

export default MainPage;
