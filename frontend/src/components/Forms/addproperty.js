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

  useEffect(() => {
    const token = localStorage.getItem("Token");

    const decodedToken = jwt_decode(token);
    const { sub } = decodedToken;
    const email = sub;
    setUserEmail(email);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response1 = await axios.get(
        `http://localhost:8080/users/getid/${userEmail}`
      );

      let userid = response1.data;

      const response2 = await axios.get(
        `http://localhost:8080/users/email/${userEmail}`
      );
      const user = response2.data;
      console.log(Object.values(user));
      const response3 = await axios.post(
        `http://localhost:8080/${userid}/addPropertybyowner`,
        {
          ...property,
          owner: {
            ownerId: user.userId,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
          },
        }
      );
      document.getElementById("popup").submit();
    } catch (error) {
      console.error(error);
    }
  };

  const handlePopupClick = (event) => {
    console.log("email " + userEmail);
    event.stopPropagation();
    document.body.classList.add("popup-open"); // add the CSS class
  };

  return (
    <>
      <div className="popup" onClick={handlePopupClick}>
        <form id="popup" onSubmit={handleSubmit}>
          <h2>Add Property</h2>
          <select
            className="type"
            name="type"
            value={property.type}
            onChange={(e) => setProperty({ ...property, type: e.target.value })}
            required
            placeholder="Property type:"
          >
            <option value="">Select property type</option>
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Studio">Studio</option>
          </select>
          <input
            type="text"
            name="image"
            value={property.image}
            onChange={(e) =>
              setProperty({ ...property, image: e.target.value })
            }
            required
            placeholder="Image : "
          />
          <input
            type="text"
            name="address"
            value={property.address}
            onChange={(e) =>
              setProperty({ ...property, address: e.target.value })
            }
            required
            placeholder="Address:"
          />

          <select
            className="type"
            name="rentPaytype"
            value={property.rentPaytype}
            onChange={(e) =>
              setProperty({ ...property, rentPaytype: e.target.value })
            }
            required
            placeholder="Rent Paytype:"
          >
            <option value="">Select payment type</option>
            <option value="Apartment">monthly</option>
            <option value="House">weekly</option>
            <option value="Studio">dayle</option>
          </select>

          <input
            type="number"
            name="size"
            value={property.size}
            onChange={(e) =>
              setProperty({ ...property, size: parseFloat(e.target.value) })
            }
            required
            placeholder="Size:"
          />
          <input
            type="number"
            name="price"
            value={property.price}
            onChange={(e) =>
              setProperty({ ...property, price: parseFloat(e.target.value) })
            }
            required
            placeholder="Price:"
          />
          <input
            type="number"
            name="chambers"
            value={property.chambers}
            onChange={(e) =>
              setProperty({ ...property, chambers: parseInt(e.target.value) })
            }
            required
            placeholder="Chambers:"
          />
          <label htmlFor="rentAvailability">Rent Availability</label>
          <input
            type="checkbox"
            name="rentAvailability"
            checked={property.rentAvailability}
            onChange={(e) =>
              setProperty({ ...property, rentAvailability: e.target.checked })
            }
            required
          />
          <button>Add Publication</button>
        </form>
      </div>
    </>
  );
};

export default AddPropertyForm;
