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

// style
import "./App.scss";

function App() {
  useEffect(() => {
    document.addEventListener("musickitloaded", () => {
      MusicKit.configure({
        developerToken: "YOUR_APPLE_MUSIC_DEVELOPER_TOKEN",
        app: { name: "SoundWise", build: "1.0.0" },
      });
    });
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/playlists" element={<Playlists />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
