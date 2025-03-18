// Auth.jsx
// npm libraries
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Auth = () => {
  const [spotifyToken, setSpotifyToken] = useState(null);
  const [appleMusicToken, setAppleMusicToken] = useState(null);
  const [musicKitReady, setMusicKitReady] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if MusicKit is ready on component mount
  useEffect(() => {
    const musicKitLoaded = () => {
      if (typeof window.MusicKit !== "undefined") {
        setMusicKitReady(true);
        console.log("MusicKit loaded and ready.");
      } else {
        console.error("MusicKit failed to load.");
      }
    };

    if (typeof window.MusicKit !== "undefined") {
      musicKitLoaded();
    } else {
      document.addEventListener("musickitloaded", musicKitLoaded);
    }

    return () => {
      document.removeEventListener("musickitloaded", musicKitLoaded);
    };
  }, []);

  // Handle Apple Music login
  const handleAppleMusicLogin = async () => {
    try {
      console.log("Attempting to log in to Apple Music...");

      if (!musicKitReady) {
        console.error("MusicKit is not ready yet.");
        return;
      }

      // Fetch the Apple Music Developer token from the backend
      const response = await axios.get("http://localhost:8888/apple/token");
      const appleToken = response.data.appleToken;

      if (!appleToken) {
        console.error("Apple Music Developer Token is missing.");
        return;
      }

      console.log("Apple Music Developer Token:", appleToken);

      // Ensure MusicKit is initialized
      let music = window.MusicKit.getInstance();
      if (!music) {
        console.warn("MusicKit instance is unavailable. Initializing...");
        window.MusicKit.configure({
          developerToken: appleToken,
          app: {
            name: "SoundWise",
            build: "1.0.0",
          },
        });

        // Wait for MusicKit to be available
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Delay 1s
        music = window.MusicKit.getInstance();
      }

      if (!music) {
        console.error("Failed to initialize MusicKit.");
        return;
      }

      console.log("Configuring MusicKit with token...");
      const token = await music.authorize();
      console.log("Apple Music Authorization token:", token);

      setAppleMusicToken(token);
      navigate("/playlists");
    } catch (error) {
      console.error("Apple Music login failed:", error);
    }
  };

  useEffect(() => {
    const { fromSpotify } = location.state || {};

    if (fromSpotify && !spotifyToken) {
      const spotifyAuthToken = new URLSearchParams(location.search).get(
        "access_token"
      );
      if (spotifyAuthToken) {
        setSpotifyToken(spotifyAuthToken);
      }
    }

    if (spotifyToken && !appleMusicToken && musicKitReady) {
      handleAppleMusicLogin();
    }
  }, [location.state, spotifyToken, appleMusicToken, musicKitReady]);

  const handleSpotifyLogin = () => {
    window.location.href = "http://localhost:8888/spotify/login"; // Redirect to backend
  };

  useEffect(() => {
    if (spotifyToken && appleMusicToken) {
      console.log("Redirecting to /playlists...");
      navigate("/playlists");
    }
  }, [spotifyToken, appleMusicToken, navigate]);

  return (
    <div>
      <h1>Authenticate</h1>
      {!spotifyToken && (
        <button onClick={handleSpotifyLogin}>Login with Spotify</button>
      )}
      {spotifyToken && !appleMusicToken && (
        <p>Authenticated with Spotify! Now, authenticate with Apple Music.</p>
      )}
      {!appleMusicToken && musicKitReady && (
        <button onClick={handleAppleMusicLogin}>Login to Apple Music</button>
      )}
      {!musicKitReady && <p>Loading Apple Music...</p>}
      {appleMusicToken && (
        <p>Authenticated with both Spotify and Apple Music!</p>
      )}
    </div>
  );
};

export default Auth;
