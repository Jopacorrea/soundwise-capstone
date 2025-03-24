//npm libraries
import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

//components
import App from "./App.jsx";

//style
import "./index.scss";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
