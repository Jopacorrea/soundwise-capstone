import React from "react";

import "./Footer.scss";

function Footer() {
  return (
    <div className="footer">
        <div className="footer__capstone">
            &copy; 2025 | SoundWise | BrainStation Capstone
        </div>
      <div className="footer__github">
        <img
          src="/icons/Github_Icon.png"
          className="footer__github__logo"
        />
        <a
          href="https://github.com/Jopacorrea"
          target="_blank"
          className="footer__github--link"
        >
          <p>Jopacorrea</p>
        </a>
      </div>
    </div>
  );
}

export default Footer;
