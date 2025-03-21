import React from "react";
import { Link } from "react-router-dom";

import "./Header.scss";
function Header() {
  const handleCleanCache = () => {
    localStorage.clear();
    localStorage.removeItem("spotifyToken");
    localStorage.removeItem("appleMusicToken");
    window.reload();
  };

  return (
    <div>
      <Link to="/" className="header__logo" onClick={() => handleCleanCache()}>
        <img
          src="./src/assets/images/Soundwise_Logo.png"
          alt="Soundwise logo"
          className="header__logo"
        />
      </Link>
    </div>
  );
}

export default Header;
