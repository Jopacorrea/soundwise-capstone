// Context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [spotifyToken, setSpotifyToken] = useState(null);
  const [appleMusicToken, setAppleMusicToken] = useState(null);
  const [musicKitReady, setMusicKitReady] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load tokens from localStorage when the app starts
  useEffect(() => {
    const spotToken = localStorage.getItem('spotifyToken');
    const appleToken = localStorage.getItem('appleMusicToken');
    
    if (spotToken) {
      setSpotifyToken(spotToken);
    }
    
    if (appleToken) {
      setAppleMusicToken(appleToken);
    }
    
    setLoading(false);
  }, []);

  // Check if MusicKit is ready
  useEffect(() => {
    const musicKitLoaded = () => {
      if (typeof window.MusicKit !== "undefined") {
        setMusicKitReady(true);
        console.log("MusicKit loaded and ready in AuthContext.");
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

  // Save Spotify token to localStorage and context
  const saveSpotifyToken = (token) => {
    if (token) {
      localStorage.setItem('spotifyToken', token);
      setSpotifyToken(token);
    } else {
      localStorage.removeItem('spotifyToken');
      setSpotifyToken(null);
    }
  };

  // Save Apple Music token to localStorage and context
  const saveAppleMusicToken = (token) => {
    if (token) {
      localStorage.setItem('appleMusicToken', token);
      setAppleMusicToken(token);
    } else {
      localStorage.removeItem('appleMusicToken');
      setAppleMusicToken(null);
    }
  };

  // Clear all tokens (for logout)
  const clearAllTokens = () => {
    localStorage.removeItem('spotifyToken');
    localStorage.removeItem('appleMusicToken');
    setSpotifyToken(null);
    setAppleMusicToken(null);
  };

  // Check if user is authenticated with both services
  const isFullyAuthenticated = () => {
    return !!spotifyToken && !!appleMusicToken;
  };

  return (
    <AuthContext.Provider 
      value={{ 
        spotifyToken, 
        appleMusicToken,
        musicKitReady,
        loading, 
        saveSpotifyToken,
        saveAppleMusicToken,
        clearAllTokens,
        isFullyAuthenticated
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);