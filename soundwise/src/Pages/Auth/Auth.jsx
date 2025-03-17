import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [developerToken, setDeveloperToken] = useState("");
  const [musicKitLoaded, setMusicKitLoaded] = useState(false); // State to track MusicKit loading
  const navigate = useNavigate();

  // Fetch Apple Music developer token from backend
  useEffect(() => {
    const fetchAppleToken = async () => {
      try {
        const response = await axios.get("http://localhost:8888/apple/token");
        setDeveloperToken(response.data.appleToken);
      } catch (error) {
        console.error("Error fetching Apple Music token:", error);
      }
    };

    fetchAppleToken();
  }, []);

  // Wait until MusicKit is fully loaded
  useEffect(() => {
    const checkMusicKit = () => {
      if (window.MusicKit) {
        setMusicKitLoaded(true); // Set MusicKit loaded flag
      } else {
        setTimeout(checkMusicKit, 100); // Retry every 100ms until MusicKit is available
      }
    };

    checkMusicKit(); // Start checking for MusicKit availability
  }, []);

  // Handle Apple Music login
  const handleAppleMusicLogin = () => {
    if (developerToken) {
      if (musicKitLoaded) {
        // Check if MusicKit is configured
        if (!window.MusicKit.isConfigured) {
          window.MusicKit.configure({
            developerToken,
            app: {
              name: "YourAppName",
              build: "1.0.0",
            },
          });
        }

        const musicKitInstance = window.MusicKit.getInstance();

        if (musicKitInstance) {
          musicKitInstance.authorize().then((user) => {
            console.log("Apple Music User authorized:", user);
            // Optionally navigate to playlists page or update UI
            navigate("/playlists");
          }).catch((error) => {
            console.error("Apple Music authorization error", error);
          });
        } else {
          console.error("MusicKit instance not available.");
        }
      } else {
        console.error("MusicKit is not loaded yet.");
      }
    } else {
      console.error("Apple Music developer token not available.");
    }
  };

  // Handle Spotify login (via your backend)
  const handleSpotifyLogin = () => {
    window.location.href = "http://localhost:8888/login"; // Redirect to your backend for Spotify login
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleSpotifyLogin}>Login with Spotify</button>
      <br />
      <button onClick={handleAppleMusicLogin}>Login with Apple Music</button>
    </div>
  );
};

export default Auth;