// Home.jsx
import React from "react";
import { Link } from "react-router-dom";

import "./Home.scss";

function Home() {
  return (
    <div className="home-component">
      <img
        src="/images/SoundWise_Logo.png"
        alt="Soundwise logo"
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
