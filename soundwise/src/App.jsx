//npm libraries
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//components

//style
import "./App.scss";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/auth" element={<h1>Auth</h1>} />
        <Route path="/playlists" element={<h1>Playlists</h1>} />
        <Route path="/transfer" element={<h1>Transfer</h1>} />
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
