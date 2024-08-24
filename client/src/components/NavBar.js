import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = ({ user }) => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="/images/monash-logo.png" alt="Monash University Logo" className="navbar-logo" />
      </div>
      <div className="navbar-center">
        <a href="/dashboard" className="navbar-link">DASHBOARD</a>
        <a href="/clubelections" className="navbar-link">CLUB ELECTIONS</a>
      </div>
      <div className="navbar-right">
        <i className="fas fa-bell navbar-icon"></i>
        <span className="navbar-username">{user.firstName} {user.lastName}</span>
        <Link to="/profile">
          <i className="fas fa-user-circle navbar-icon"></i>
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
