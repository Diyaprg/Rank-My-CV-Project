import React, { useState } from "react"; 
import "./Navbar.css";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNav = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <div className="navbar">

      <div className="logo" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
        RankMyCV
      </div>

      <button
        className={`hamburger ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <circle cx="5" cy="5" r="2" fill="#1d1860" />
          <circle cx="11" cy="5" r="2" fill="#1d1860" />
          <circle cx="17" cy="5" r="2" fill="#1d1860" />
          <circle cx="5" cy="11" r="2" fill="#1d1860" />
          <circle cx="11" cy="11" r="2" fill="#1d1860" />
          <circle cx="17" cy="11" r="2" fill="#1d1860" />
          <circle cx="5" cy="17" r="2" fill="#1d1860" />
          <circle cx="11" cy="17" r="2" fill="#1d1860" />
          <circle cx="17" cy="17" r="2" fill="#1d1860" />
        </svg>
      </button>

      <ul className={`nav-links ${isOpen ? 'open' : ''}`}>

        <li>
          <a onClick={() => handleNav('/')}>
            Home
          </a>
        </li>

        <li>
          <a onClick={() => handleNav('/analysis')}>
            Analysis
          </a>
        </li>

        <li>
          <a onClick={() => handleNav('/career-tips')}>
            Career Tips
          </a>
        </li>

      </ul>

      <button className="nav-btn" onClick={() => handleNav('/analysis')}>
        Upload and Scan
      </button>

    </div>
  );
};

export default Navbar;