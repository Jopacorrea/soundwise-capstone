//App.jsx
// npm libraries
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// components
import { AuthProvider } from "./Context/AuthContext";
import Home from "./Pages/Home/Home";
import Auth from "./Pages/Auth/Auth";
import Playlists from "./Pages/Playlists/Playlists";
import Summary from "./Pages/Summary/Summary";
import PageNotFound from "./Pages/404/PageNotFound";
import Transfer from "./Pages/Transfer/Transfer";

// style
import "./App.scss";

function App() {
  useEffect(() => {
    window.checkMusicKit = () => {
      console.log(
        "MusicKit available:",
        typeof window.MusicKit !== "undefined"
      );
      try {
        const instance = window.MusicKit.getInstance();
        console.log("MusicKit instance:", instance);
        return instance;
      } catch (e) {
        console.error("Error getting MusicKit instance:", e);
        return null;
      }
    };
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/playlists" element={<Playlists />} />
          <Route path="/transfer" element={<Transfer />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
