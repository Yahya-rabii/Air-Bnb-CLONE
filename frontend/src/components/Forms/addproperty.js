import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import "./addprop.css";

const AddPropertyForm = () => {
  const [property, setProperty] = useState({
    type: "",
    image: "",
    address: "",
    rentPaytype: "",
    size: "",
    owner: "",
    price: "",
    chambers: "",
    rentAvailability: false,
  });

  const [userEmail, setUserEmail] = useState("");
  const [userId, setuserId] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("Token");


    const decodedToken = jwt_decode(token);
    const { sub } = decodedToken;
    const email = sub;
    setUserEmail(email);
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .get(`http://localhost:8080/users/getid/${userEmail}`)
      .then((response) => {
        setuserId(response.data);
        console.log(userId);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get(`http://localhost:8080/users/email/${userEmail}`)
      .then((response) => {
        const user = response.data;
        console.log(Object.values(user));
        axios
          .post(`http://localhost:8080/${userId}/addPropertybyowner`, {
            ...property,
            owner: {
              ownerId: user.userId,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              phoneNumber: user.phoneNumber,
              role: user.role,
            },
          })
          .then((response) => {})
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handlePopupClick = (event) => {
    console.log("email " + userEmail);
    event.stopPropagation();
    document.body.classList.add("popup-open"); // add the CSS class
  };


  return (
    <>
      <div className="popup" onClick={handlePopupClick}>
        <form onSubmit={handleSubmit}>
          <h2>Add Property</h2>
          <label htmlFor="type">Type:</label>
          <input
            type="text"
            name="type"
            value={property.type}
            onChange={(e) =>
              setProperty({
                ...property,

                type: e.target.value,
              })
            }
            required
          />
          <label htmlFor="image">Image:</label>
          <input
            type="text"
            name="image"
            value={property.image}
            onChange={(e) =>
              setProperty({
                ...property,

                image: e.target.value,
              })
            }
            required
          />
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            name="address"
            value={property.address}
            onChange={(e) =>
              setProperty({
                ...property,

                address: e.target.value,
              })
            }
            required
          />
          <label htmlFor="rentPaytype">Rent Paytype:</label>
          <input
            type="text"
            name="rentPaytype"
            value={property.rentPaytype}
            onChange={(e) =>
              setProperty({
                ...property,

                rentPaytype: e.target.value,
              })
            }
            required
          />
          <label htmlFor="size">Size:</label>
          <input
            type="number"
            name="size"
            value={property.size}
            onChange={(e) =>
              setProperty({
                ...property,

                size: parseFloat(e.target.value),
              })
            }
            required
          />

          <label htmlFor="price">Price:</label>
          <input
            type="number"
            name="price"
            value={property.price}
            onChange={(e) =>
              setProperty({
                ...property,

                price: parseFloat(e.target.value),
              })
            }
            required
          />
          <label htmlFor="chambers">Chambers:</label>
          <input
            type="number"
            name="chambers"
            value={property.chambers}
            onChange={(e) =>
              setProperty({
                ...property,

                chambers: parseInt(e.target.value),
              })
            }
            required
          />
          <label htmlFor="rentAvailability">Rent Availability:</label>
          <input
            type="checkbox"
            name="rentAvailability"
            checked={property.rentAvailability}
            onChange={(e) =>
              setProperty({
                ...property,

                rentAvailability: e.target.checked,
              })
            }
            required
          />

          <button type="submit">Add Publication</button>
        </form>
      </div>
    </>
  );
};

export default AddPropertyForm;
