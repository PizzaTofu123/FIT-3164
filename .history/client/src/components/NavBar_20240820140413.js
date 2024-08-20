import React from 'react';
import './NavBar.css'; // Import the CSS for styling

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="/images/monash-logo.png" alt="Monash University Logo" className="navbar-logo" />
      </div>
      <div className="navbar-center">
        <Link to="/" className="navbar-link">DASHBOARD</Link>
        <Link to="/clubelections" className="navbar-link">CLUB ELECTIONS</Link>
      </div>
      <div className="navbar-right">
        <i className="fas fa-bell navbar-icon"></i>
        <span className="navbar-username">Bob Wilson</span>
        <i className="fas fa-user-circle navbar-icon"></i>
      </div>
    </nav>
  );
}

export default NavBar;
