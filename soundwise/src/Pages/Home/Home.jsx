// Home.jsx
import React from "react";
import { Link } from "react-router-dom";

import logoImage from "../../assets/images/Soundwise_Logo.png";
import "./Home.scss";

function Home() {
  return (
    <div className="home-component">
      <img
        src={logoImage}
        className="home-component__logo"
      />
      <h1 className="home-component__title">SoundWise</h1>
      <Link to="/auth" className="home-component__button">
        <div>start</div>
      </Link>
    </div>
  );
}

export default Home;
