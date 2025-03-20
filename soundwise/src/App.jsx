// App.jsx
// npm libraries
import React, { useEffect, useRef } from "react";
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
  const interactiveBubbleRef = useRef(null);

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

  // Set up the interactive bubble animation
  useEffect(() => {
    if (!interactiveBubbleRef.current) return;

    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0;
    
    function move() {
      curX += (tgX - curX) / 20;
      curY += (tgY - curY) / 20;
      
      if (interactiveBubbleRef.current) {
        interactiveBubbleRef.current.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
      }
      
      requestAnimationFrame(() => {
        move();
      });
    }
    
    const handleMouseMove = (event) => {
      tgX = event.clientX;
      tgY = event.clientY;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    move();
    
    // Cleanup function
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [interactiveBubbleRef]); 

  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="gradient-bg">
          <svg xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="goo">
                <feGaussianBlur
                  in="SourceGraphic"
                  stdDeviation="10"
                  result="blur"
                />
                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
                  result="goo"
                />
                <feBlend in="SourceGraphic" in2="goo" />
              </filter>
            </defs>
          </svg>
          <div className="gradients-container">
            <div className="g1"></div>
            <div className="g2"></div>
            <div className="g3"></div>
            <div className="g4"></div>
            <div className="g5"></div>
            <div className="interactive" ref={interactiveBubbleRef}></div>
          </div>
        </div>
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