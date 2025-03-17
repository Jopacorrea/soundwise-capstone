// Auth.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Auth() {
  const navigate = useNavigate();

  useEffect(() => {
    // Extract access_token from URL
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("access_token");

    if (accessToken) {
      // Store token and redirect
      localStorage.setItem("spotify_access_token", accessToken);
      navigate("/playlists"); // Redirect to playlists
    }
  }, [navigate]);

  const handleLogin = () => {
    window.location.href = "http://localhost:8888/login"; // Redirect to backend for Spotify login
  };

  return (
    <div>
      <h1>Auth</h1>
      <button onClick={handleLogin}>Login with Spotify</button>
    </div>
  );
}

export default Auth;

