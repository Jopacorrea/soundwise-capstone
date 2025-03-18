// Context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [spotifyToken, setSpotifyToken] = useState(
    localStorage.getItem("spotifyToken") || null
  );
  const [appleMusicToken, setAppleMusicToken] = useState(
    localStorage.getItem("appleMusicToken") || null
  );

  useEffect(() => {
    if (spotifyToken) localStorage.setItem("spotifyToken", spotifyToken);
    if (appleMusicToken)
      localStorage.setItem("appleMusicToken", appleMusicToken);
  }, [spotifyToken, appleMusicToken]);

  return (
    <AuthContext.Provider
      value={{
        spotifyToken,
        setSpotifyToken,
        appleMusicToken,
        setAppleMusicToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
