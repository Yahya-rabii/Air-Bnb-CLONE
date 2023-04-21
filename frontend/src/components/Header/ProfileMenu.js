import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AddPublicationForm from "../Forms/addpublication";
import AddPropertyForm from "../Forms/addproperty";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import "./styles.css";
import "../Forms/addprop.css";

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [showRegistrationForm, setShowRegistrationForm] = React.useState(false);
  const [showLoginForm, setShowLoginForm] = React.useState(false);
  const [ShowAddpubForm, setShowAddpubForm] = React.useState(false);
  const [ShowAddpropForm, setShowAddpropForm] = React.useState(false);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [owner, setOwner] = React.useState(false);
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSignup = () => {
    setShowLoginForm(false);
    setShowAddpubForm(false);
    setShowAddpropForm(false);
    setShowRegistrationForm(true);
    handleClose();
  };
  const handleSignin = () => {
    setShowLoginForm(true);
    setShowAddpubForm(false);
    setShowAddpropForm(false);
    setShowRegistrationForm(false);
    handleClose();
  };
  const handlelogout = () => {
    setShowLoginForm(false);
    setShowAddpubForm(false);
    setShowAddpropForm(false);
    setShowRegistrationForm(false);
    localStorage.removeItem("Token");
  };
  const handleaddpub = () => {
    setShowLoginForm(false);
    setShowAddpubForm(true);
    setShowAddpropForm(false);
    setShowRegistrationForm(false);
    handleClose();
  };

  const handleaddprop = () => {
    setShowLoginForm(false);
    setShowAddpubForm(false);
    setShowAddpropForm(true);
    setShowRegistrationForm(false);
    handleClose();
  };
  const justClose = () => {
    SubmitEvent.apply();
    setShowLoginForm(false);
    setShowAddpubForm(false);
    setShowAddpropForm(false);
    setShowRegistrationForm(false);
    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <div
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className="profile-menu-flex"
      >
        <MenuRoundedIcon />
        <AccountCircleRoundedIcon />
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        sx={{
          ".MuiPaper-root": {
            minWidth: "200px",
            borderRadius: "1rem",
            boxShadow: "0 1px 2px rgb(0 0 0 / 8%), 0 4px 12px rgb(0 0 0 / 5%)",
          },
        }}
      >
        <MenuItem className="menu-items" onClick={handleSignup}>
          Signup
        </MenuItem>
        <MenuItem onClick={handleSignin} className="menu-items">
          Login
        </MenuItem>
        <MenuItem onClick={handlelogout} className="menu-items">
          Logout
        </MenuItem>
        <MenuItem onClick={handleaddpub} className="menu-items">
          add Publication
        </MenuItem>
        <MenuItem onClick={handleaddprop} className="menu-items">
          add Property
        </MenuItem>

        <div
          style={{
            height: "1px",
            backgroundColor: "var(--grey)",
            width: "100%",
          }}
        />
        <MenuItem onClick={handleClose} className="menu-items">
          Airbnb Your Home
        </MenuItem>
        <MenuItem onClick={handleClose} className="menu-items">
          Host an experience
        </MenuItem>
        <MenuItem onClick={handleClose} className="menu-items">
          Help
        </MenuItem>
      </Menu>
      {showRegistrationForm && (
        <form
          className="popup"
          onSubmit={(event) => {
            event.preventDefault();
            fetch("http://localhost:8080/register", {
              method: "POST",
              body: JSON.stringify({
                firstname: firstName,
                lastname: lastName,
                email: email,
                phoneNumber: phoneNumber,
                password: password,
                owner: owner,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((response) => {
                console.log(response);
                return response.json();
              })
              .then((data) => console.log(data))
              .catch((error) => console.error(error));
          }}
        >
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            onChange={(event) => setFirstName(event.target.value)}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            onChange={(event) => setLastName(event.target.value)}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            type="phone"
            name="phoneNumber"
            placeholder="Phone Number"
            onChange={(event) => setPhoneNumber(event.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <label>Owner</label>
          <input
            type="checkbox"
            name="owner"
            checked={owner}
            placeholder="Owner"
            onChange={(event) => setOwner(true)}
          />
          <button type="submit">Register</button>
        </form>
      )}

      {showLoginForm && (
        <form
          form
          className="popup"
          onSubmit={(event) => {
            event.preventDefault();
            fetch("http://localhost:8080/authenticate", {
              method: "POST",
              body: JSON.stringify({
                email: email,
                password: password,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((response) => response.text())
              .then((jwtToken) => {
                localStorage.setItem("Token", jwtToken);
              });
          }}
        >
          <input
            type="text"
            name="email"
            placeholder="email"
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            type="text"
            name="password"
            placeholder="password"
            onChange={(event) => setPassword(event.target.value)}
          />

          <button type="submit" onClick={justClose}>
            Login
          </button>
        </form>
      )}
      {ShowAddpubForm && <AddPublicationForm />}
      {ShowAddpropForm && <AddPropertyForm />}
    </div>
  );
}
