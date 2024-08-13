import React from 'react';
import './Navbar.css';  // Importing the CSS file for styling

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/images/monash-logo.png" alt="Monash University" /> {/* Correct path to the Monash logo */}
        <span></span>
      </div>
      <div className="navbar-links">
        <a href="#dashboard">DASHBOARD</a>
        <a href="#club-elections">CLUB ELECTIONS</a>
      </div>
      <div className="navbar-icons">
        <i className="fas fa-bell"></i> {/* This is for the notification bell icon */}
        <span>Bob Wilson</span>
        <a href="/profile"><i className="fas fa-user-circle"></i></a> {/* This is for the user icon */}
      </div>
    </nav>
  );
}

export default Navbar;
