import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import "./addprop.css";

const AddPublicationForm = () => {
  const [publication, setPublication] = useState({
    releaseDate: "",
    title: "",
    propertyId: "",
    owner: {
      idUser: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    property: {
      idProperty: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
    },
  });

  const [properties, setProperties] = useState([]);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("Token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const decodedToken = jwt_decode(token);
    const { sub } = decodedToken;
    const email = sub;
    setUserEmail(email);

    axios
      .get(`http://localhost:8080/properties/email/${email}`, config)
      .then((response) => {
        console.log(Object.values(response.data));
        setProperties(response.data);
      })
      .catch((error) => {
        console.error(error);
        // Show an error message to the user
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8080/publications", publication)
      .then((response) => {})
      .catch((error) => {
        console.error(error);
      });
  };

  const handlePopupClick = (event) => {
    console.log("email " + userEmail);
    event.stopPropagation();
    document.body.classList.add("popup-open"); // add the CSS class
    axios
      .get(`http://localhost:8080/users/email/${userEmail}`)
      .then((response) => {
        const user = response.data;
        console.log(Object.values(user));

        setPublication({
          ...publication,
          owner: {
            ...publication.owner,
            ownerId: user.userId,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
          },
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handlePopupClose = () => {
    document.body.classList.remove("popup-open"); // remove the CSS class
  };

  return (
    <>
      <div className="popup" onClick={handlePopupClick}>
        <form onSubmit={handleSubmit}>
          <h2>Add Publication</h2>
          <label htmlFor="releaseDate">Release Date:</label>
          <input
            type="date"
            name="releaseDate"
            value={publication.releaseDate}
            onChange={(e) =>
              setPublication({ ...publication, releaseDate: e.target.value })
            }
            required
          />
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            value={publication.title}
            onChange={(e) =>
              setPublication({ ...publication, title: e.target.value })
            }
            required
          />

          <label htmlFor="publisher">Publisher:</label>
          <input
            type="text"
            name="publisher"
            value={publication.publisher}
            onChange={(e) =>
              setPublication({ ...publication, publisher: e.target.value })
            }
            required
          />

          <h3>Select a Property:</h3>
          <select
            id="propertySelect"
            value={publication.property.idProperty}
            onChange={(e) =>
              setPublication({
                ...publication,
                property: {
                  ...publication.property,
                  idProperty: e.target.value,
                },
              })
            }
          >
            <option value="">--Please select a property--</option>
            {properties.map((property) => (
              <option key={property.idProperty} value={property.idProperty}>
                {property.address}, {property.type},{property.size},
                {property.chambers},{property.price} , {property.image} ,
                {property.rentAvailability},{property.paytype}
              </option>
            ))}
          </select>

          <button type="submit">Add Publication</button>
        </form>
      </div>
    </>
  );
};

export default AddPublicationForm;
