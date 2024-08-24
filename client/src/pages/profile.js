import React, { useState } from 'react';
import './profile.css';
import { Link } from 'react-router-dom';

function Profile({ user }) {
  const [activeTab, setActiveTab] = useState('about');

  const renderContent = () => {
    switch (activeTab) {
      case 'about':
        return (
          <div className="profile-info">
            <div className="profile-info-item">
              <i className="fas fa-user"></i>
              <div>
                <label>First Name</label>
                <p>{user.firstName}</p>
              </div>
            </div>
            <div className="profile-info-item">
              <i className="fas fa-user"></i>
              <div>
                <label>Last Name</label>
                <p>{user.lastName}</p>
              </div>
            </div>
            <div className="profile-info-item">
              <i className="fas fa-venus-mars"></i>
              <div>
                <label>Pronouns</label>
                <p>{user.pronouns}</p>
              </div>
            </div>
            <div className="profile-info-item">
              <i className="fas fa-id-card"></i>
              <div>
                <label>Monash Student ID</label>
                <p>{user.studentID}</p>
              </div>
            </div>
            <div className="profile-info-item">
              <i className="fas fa-envelope"></i>
              <div>
                <label>Monash Email Address</label>
                <p>{user.email}</p>
              </div>
            </div>
            <div className="profile-info-item">
              <i className="fas fa-phone"></i>
              <div>
                <label>Mobile Number</label>
                <p>{user.mobile}</p>
              </div>
            </div>
          </div>
        );
      case 'education':
        return (
          <div className="profile-info">
            <div className="profile-info-item">
              <i className="fas fa-graduation-cap"></i>
              <div>
                <label>Level</label>
                <p>{user.level}</p>
              </div>
            </div>
            <div className="profile-info-item">
              <i className="fas fa-university"></i>
              <div>
                <label>Faculty</label>
                <p>{user.faculty}</p>
              </div>
            </div>
            <div className="profile-info-item">
              <i className="fas fa-book"></i>
              <div>
                <label>Course</label>
                <p>{user.course}</p>
              </div>
            </div>
            <div className="profile-info-item">
              <i className="fas fa-calendar-alt"></i>
              <div>
                <label>Year</label>
                <p>{user.year}</p>
              </div>
            </div>
          </div>
        );
      case 'clubs':
        return (
          <div className="profile-info">
            <div className="profile-info-item">
              <i className="fas fa-users"></i>
              <div>
                <label>Commerce and Computing Association (CCA)</label>
                <p></p>
              </div>
            </div>
            <div className="profile-info-item">
              <i className="fas fa-users"></i>
              <div>
                <label>Monash Association of Coding (MAC)</label>
                <p></p>
              </div>
            </div>
            <div className="profile-info-item">
              <i className="fas fa-shield-alt"></i>
              <div>
                <label>Monash Cybersecurity Club (MONSEC)</label>
                <p></p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src={user.profilePicture} alt="Profile" className="profile-picture" />
        <div className="profile-header-text">
          <h1>{user.firstName} {user.lastName}</h1>
          <Link to="/edit-profile" className="edit-profile-link">Edit profile</Link>
        </div>
      </div>
      <div className="profile-tabs">
        <button className={`tab-button ${activeTab === 'about' ? 'active' : ''}`} onClick={() => setActiveTab('about')}>About</button>
        <button className={`tab-button ${activeTab === 'education' ? 'active' : ''}`} onClick={() => setActiveTab('education')}>Education</button>
        <button className={`tab-button ${activeTab === 'clubs' ? 'active' : ''}`} onClick={() => setActiveTab('clubs')}>Clubs</button>
      </div>
      <div className="profile-content">
        {renderContent()}
      </div>
    </div>
  );
}

export default Profile;
