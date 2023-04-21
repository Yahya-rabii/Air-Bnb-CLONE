import React from "react";
import logo from "../../assets/logo/long-logo.png";
import "./styles.css";
import BasicMenu from "./ProfileMenu";
import SimpleBottomNavigation from "./BottomNav";
import MobileSearchBar from "../MobileSearchBar";

function Header() {
  return (
    <div className="navbar">
      <img src={logo} alt="logo" className="navbar-logo" />
    
      <div className="profile-container">
      
        <div className="profile-div">
          <BasicMenu />
        </div>
      </div>
      <MobileSearchBar />
      <SimpleBottomNavigation />
    </div>
  );
}

export default Header;
