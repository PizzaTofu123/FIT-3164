// src/components/NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = ({ user }) => {
  // Safely access user data with optional chaining
  const firstName = user?.firstName || 'Guest';
  const lastName = user?.lastName || '';
  const representingClubs = user?.representingClubs || []; // Check if the user has any representing clubs

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">
          <img src="/images/monash-logo.png" alt="Monash University Logo" className="navbar-logo" />
        </Link>
      </div>
      <div className="navbar-center">
        <Link to="/" className="navbar-link">DASHBOARD</Link>
        <Link to="/clubelections" className="navbar-link">CLUB ELECTIONS</Link>
      </div>
      <div className="navbar-right">
        {representingClubs.length > 0 && (
          <Link to="/clubrepresentative">
            <i className="fas fa-user-tie navbar-icon"></i>
          </Link>
        )}
        <i className="fas fa-bell navbar-icon"></i>
        <span className="navbar-username">{firstName} {lastName}</span>
        <Link to="/profile">
          <i className="fas fa-user-circle navbar-icon"></i>
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
