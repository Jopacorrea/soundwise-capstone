//App.jsx
//npm libraries
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// components
import Home from "./Pages/Home/Home.jsx";
import PageNotFound from "./Pages/404/PageNotFound.jsx";
import Playlists from "./Pages/Playlists/Playlists.jsx";
import Auth from "./Pages/Auth/Auth.jsx";

// style
import "./App.scss";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/playlists" element={<Playlists />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;