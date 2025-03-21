import React from "react";

//style
import "./Summary.scss";
import { useNavigate } from "react-router-dom";



function Summary() {
  const navigate = useNavigate();

  return <div className="summary">
    
    <h1 className="summary__title">Summary</h1>

    <div className="summary__content">
    <h3 className="summary__subtitle">Transfer complete</h3>

    <div className="summary__open-apple" onClick={() => window.open("itmss://music.apple.com/")}>
    <img
              src="./src/assets/images/AppleMusic.png"
              alt="apple music logo"
              className="apple-music__logo"
            />
      <span className="summary__open-apple-text">Open Apple Music</span></div>

    <div className="summary__return-home" onClick={() => navigate("/playlists")}>Return to playlists</div>
      
    </div>
  </div>;
}

export default Summary;
