import React, { useState } from 'react';
import './profile.css';
import { Link } from 'react-router-dom';

// Function to format the date as dd/mm/yyyy
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

function Profile({ user, handleLogout }) {
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
              <i className="fas fa-id-card"></i>
              <div>
                <label>Monash Student ID</label>
                <p>{user.studentId}</p>
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
              <i className="fas fa-calendar-alt"></i>
              <div>
                <label>Date of Birth</label>
                <p>{formatDate(user.dob)}</p>
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
              <i className="fas fa-university"></i>
              <div>
                <label>Second Faculty</label>
                <p>{user.secondFaculty}</p>
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
            {user.clubs && user.clubs.length > 0 ? (
              user.clubs.map((club, index) => (
                <div key={index} className="profile-info-item">
                  <i className="fas fa-users"></i>
                  <div>
                    <label>{club.clubName}</label> {/* Ensure that club names are shown */}
                  </div>
                </div>
              ))
            ) : (
              <p>No clubs found.</p>
            )}
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

      <button className="logout-button" onClick={handleLogout}>Log Out</button>
    </div>
  );
}

export default Profile;
