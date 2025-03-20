// Home.jsx
import React from "react";
import { Link } from "react-router-dom";

import "./Home.scss";

function Home() {
  return (
    <div className="home-component">
      <h1 className="home-component__title">SoundWise</h1>
      <Link to="/auth">
        <h2 className="home-component__subtitle">start</h2>
      </Link>
    </div>
  );
}

export default Home;