// Home.jsx
import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>SoundWise</h1>
      <Link to="/auth">
        <h2>Login with Spotify</h2>
      </Link>
    </div>
  );
}

export default Home;