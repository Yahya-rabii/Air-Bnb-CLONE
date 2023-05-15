import React, { useState, useEffect } from "react";
import "./styles.css";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";
import axios from "axios";
import { Button } from "@mui/material";
import jwt_decode from "jwt-decode";

function Card({ publication }) {
  const [isReserved, setIsReserved] = useState(false);
  const [userEmail, setUserEmail] = useState("");


  useEffect(() => {
    const token = localStorage.getItem("Token");
  

    const decodedToken = jwt_decode(token);
    const { sub } = decodedToken;
    const email = sub;
    setUserEmail(email);
    console.log("user email " + userEmail);

    if (publication.property.rentAvailability === false) {
      setIsReserved(true);
    }
  },  [publication.property.rentAvailability, userEmail]);

  const handleReservation = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/users/getid/${userEmail}`
      );
      const userId = response.data;
      console.log("user id " + userId);

      const response2 = await axios.get(
        `http://localhost:8080/users/${userId}`
      );
      const user = response2.data;
      console.log("user " + JSON.stringify(user));
      const reservation = {
        owner: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber,
        },
        property: {
          type: publication.property.type,
          address: publication.property.address,
          rentPaytype: publication.property.rentPaytype,
          size: publication.property.size,
          price: publication.property.price,
          chambers: publication.property.chambers,
          rentAvailability: publication.property.rentAvailability,
          image: publication.property.image,
        },
        startDate: "2023-05-01", // replace with desired start date
        endDate: "2023-05-07", // replace with desired end date
      };

      const response3 = await axios.post(
        `http://localhost:8080/people/${userId}/properties/${publication.property.idProperty}/reservations`,
        reservation
      );
      console.log(response3.data);

      setIsReserved(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="card-box">
      <Swiper
        slidesPerView={1}
        spaceBetween={15}
        loop={true}
        mousewheel={true}
        cssMode={true}
        pagination
        modules={[Pagination, Navigation]}
        className="swiper-container"
      >
        <SwiperSlide>
          <img src={publication.property.image} alt="" className="card-img" />
        </SwiperSlide>
      </Swiper>
      <div className="card-info-flex">
        <h3 className="card-title">{publication.title}</h3>
        <div className="card-rating">
          <StarRateRoundedIcon />
          {/* Display if the property is available for rent or not */}
          <p>
            {publication.property.rentAvailability
              ? "Available"
              : "Not Available"}
          </p>
        </div>
      </div>
      <p style={{ margin: 0, color: "var(--font-grey)" }}>
        {publication.property.address}
      </p>
      <p style={{ margin: 0, color: "var(--font-grey)" }}>
        chambers : {publication.property.chambers}
      </p>
      <p style={{ margin: "0.2rem", fontSize: "1rem", color: "var(--black" }}>
        <span style={{ fontWeight: "600" }}>
          {publication.property.price} DH
        </span>{" "}
        {publication.property.rentPaytype}
      </p>
      <Button
        variant="contained"
        className="card-button"
        onClick={handleReservation}
        disabled={isReserved}
      >
        {isReserved ? "Reserved" : "Reserve"}
      </Button>
    </div>
  );
}

function Publications() {
  const [publications, setPublications] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/publications").then((response) => {
      setPublications(response.data);
    });
  }, []);

  return (
    <div className="publications">
      {publications.map((publication) => (
        <Card key={publication.id} publication={publication} />
      ))}
    </div>
  );
}

export default Publications;