//App.jsx
//npm libraries
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// components
import Home from "./Pages/Home/Home.jsx";
import Auth from "./Pages/Auth/Auth.jsx";
import Playlists from "./Pages/Playlists/Playlists.jsx";
import Summary from "./Pages/Summary/Summary.jsx";
import PageNotFound from "./Pages/404/PageNotFound.jsx";

// style
import "./App.scss";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/playlists" element={<Playlists />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;