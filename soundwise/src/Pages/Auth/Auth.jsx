// Auth.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext.jsx";

const Auth = () => {
  const [authError, setAuthError] = useState(null);
  const {
    spotifyToken,
    appleMusicToken,
    musicKitReady,
    saveSpotifyToken,
    saveAppleMusicToken,
  } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  // Handle Spotify authentication from URL parameters
  useEffect(() => {
    const spotifyParams = new URLSearchParams(location.search);
    const spotifyAuthToken = spotifyParams.get("access_token");
    const error = spotifyParams.get("error");

    if (error) {
      setAuthError(`Spotify authentication error: ${error}`);
      return;
    }

    if (spotifyAuthToken && !spotifyToken) {
      saveSpotifyToken(spotifyAuthToken);
      console.log("Spotify token saved from URL parameters");
    }
  }, [location.search, spotifyToken, saveSpotifyToken]);

  // Auto-trigger Apple Music login when Spotify is authenticated
  useEffect(() => {
    if (spotifyToken && !appleMusicToken && musicKitReady) {
      handleAppleMusicLogin();
    }
  }, [spotifyToken, appleMusicToken, musicKitReady]);

  // Handle Apple Music login
  const handleAppleMusicLogin = async () => {
    try {
      console.log("Attempting to log in to Apple Music...");
      setAuthError(null);

      if (!musicKitReady) {
        setAuthError("Apple Music is not ready yet. Please try again.");
        return;
      }

      // Fetch the Apple Music Developer token from the backend
      const response = await axios.get("http://localhost:8888/apple/token");
      const developerToken = response.data.appleToken;

      if (!developerToken) {
        setAuthError(
          "Could not retrieve Apple Music developer token from server"
        );
        return;
      }

      console.log("Got developer token:", developerToken);

      // Configure MusicKit with a safer approach
      try {
        // First, make sure window.MusicKit exists
        if (typeof window.MusicKit === "undefined") {
          throw new Error("MusicKit is not available");
        }

        // Configure MusicKit
        window.MusicKit.configure({
          developerToken: developerToken,
          app: {
            name: "SoundWise",
            build: "1.0.0",
          },
        });

        // Add a delay to ensure configuration completes
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Get instance after configuration
        const music = window.MusicKit.getInstance();

        if (!music) {
          throw new Error(
            "Failed to get MusicKit instance after configuration"
          );
        }

        console.log(
          "MusicKit configured successfully, attempting to authorize..."
        );

        // Authorize with Apple Music
        const userToken = await music.authorize();
        console.log("Apple Music authorization successful");

        // Save the token
        saveAppleMusicToken(userToken);

        // Navigate to playlists if both services are authenticated
        if (spotifyToken) {
          navigate("/playlists");
        }
      } catch (musicKitError) {
        console.error(
          "MusicKit configuration or authorization error:",
          musicKitError
        );
        setAuthError(`Apple Music error: ${musicKitError.message}`);
      }
    } catch (error) {
      console.error("Apple Music login failed:", error);
      setAuthError(error.message || "Failed to authenticate with Apple Music");
    }
  };
  // Handle Spotify login button click
  const handleSpotifyLogin = () => {
    window.location.href = "http://localhost:8888/spotify/login";
  };

  // Redirect to playlists when both authenticated
  useEffect(() => {
    if (spotifyToken && appleMusicToken) {
      console.log("Fully authenticated, redirecting to playlists");
      navigate("/playlists");
    }
  }, [spotifyToken, appleMusicToken, navigate]);

  return (
    <div className="auth-container">
      <h1>Connect Your Music Services</h1>

      {authError && (
        <div className="auth-error">
          <p>{authError}</p>
          <button onClick={() => setAuthError(null)}>Dismiss</button>
        </div>
      )}

      <div className="auth-services">
        <div className="service-auth spotify">
          <h2>Spotify</h2>
          {!spotifyToken ? (
            <button onClick={handleSpotifyLogin} className="spotify-login-btn">
              Connect Spotify
            </button>
          ) : (
            <div className="auth-status success">
              <span>✓</span> Connected to Spotify
            </div>
          )}
        </div>

        <div className="service-auth apple-music">
          <h2>Apple Music</h2>
          {!appleMusicToken ? (
            !musicKitReady ? (
              <p>Loading Apple Music...</p>
            ) : (
              <button
                onClick={handleAppleMusicLogin}
                className="apple-login-btn"
                disabled={!spotifyToken}
              >
                Connect Apple Music
              </button>
            )
          ) : (
            <div className="auth-status success">
              <span>✓</span> Connected to Apple Music
            </div>
          )}

          {spotifyToken && !appleMusicToken && musicKitReady && (
            <p className="auth-hint">Please connect Apple Music to continue</p>
          )}
        </div>
      </div>

      {spotifyToken && appleMusicToken && (
        <div className="auth-complete">
          <p>Authentication complete! You can now transfer your playlists.</p>
          <button
            onClick={() => navigate("/playlists")}
            className="continue-btn"
          >
            Continue to Playlists
          </button>
        </div>
      )}
    </div>
  );
};

export default Auth;
