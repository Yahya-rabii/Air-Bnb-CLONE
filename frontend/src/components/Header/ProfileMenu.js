import React from "react";
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
  const [role, setRole] = React.useState("USER");
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
    if (localStorage.getItem("Token")) {
      setShowLoginForm(false);
      setShowAddpubForm(true);
      setShowAddpropForm(false);
      setShowRegistrationForm(false);
      handleClose();
    } else {
      alert("Please log in first.");
    }
  };

  const handleaddprop = () => {
    if (localStorage.getItem("Token")) {
      setShowLoginForm(false);
      setShowAddpubForm(false);
      setShowAddpropForm(true);
      setShowRegistrationForm(false);
      handleClose();
    } else {
      alert("Please log in first.");
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function submitAndClose() {
    document.getElementById("login").submit();
    setShowLoginForm(false);
  }

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
        <MenuItem
          onClick={handlelogout}
          className="menu-items"
          style={{ color: "red" }}
        >
          Logout
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
                role: role,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((response) => {
                console.log(response);
                return response.json();
              })
              .then((data) => {
                setShowRegistrationForm(false);
                setShowLoginForm(true);
              })
              .catch((error) => console.error(error));
          }}
        >
          <h2>Signup</h2>
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

          <select
            className="type"
            name="Role"
            onChange={(event) => setRole(event.target.value)}
          >
            <option value="OWNER">USER</option>
            <option value="OWNER">OWNER</option>
          </select>
          <button type="submit">Register</button>
        </form>
      )}

      {showLoginForm && (
        <>
          <form
            form
            id="login"
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
                  submitAndClose();
                });
            }}
          >
            <h2>Login</h2>

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

            <button type="submit">Login</button>
          </form>
        </>
      )}
      {ShowAddpubForm && localStorage.getItem("Token") ? (
        <AddPublicationForm />
      ) : null}

      {ShowAddpropForm && localStorage.getItem("Token") ? (
        <AddPropertyForm />
      ) : null}

      {!localStorage.getItem("Token") && (ShowAddpropForm || ShowAddpubForm) ? (
        <div className="popup" style={{ backgroundColor: "#fff" }}>
          <p style={{ color: "var(--red)" }}>Please login first</p>
        </div>
      ) : null}
    </div>
  );
}
