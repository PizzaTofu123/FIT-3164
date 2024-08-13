import React, { useState } from 'react';
import './Profile.css';

function Profile() {
  const [activeTab, setActiveTab] = useState('about');
  const [editing, setEditing] = useState(false);

  const toggleEdit = () => {
    setEditing(!editing);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'about':
        return (
          <div className="profile-info">
            <div className="profile-info-item">
              <i className="fas fa-user"></i>
              <div>
                <label>Name</label>
                {editing ? <input type="text" defaultValue="Bobby Wilson" /> : <p>Bobby Wilson</p>}
              </div>
            </div>
            <div className="profile-info-item">
              <i className="fas fa-venus-mars"></i>
              <div>
                <label>Pronouns</label>
                {editing ? <input type="text" defaultValue="He/Him" /> : <p>He/Him</p>}
              </div>
            </div>
            <div className="profile-info-item">
              <i className="fas fa-id-card"></i>
              <div>
                <label>Monash Student ID</label>
                <p>31234567</p>
              </div>
            </div>
            <div className="profile-info-item">
              <i className="fas fa-envelope"></i>
              <div>
                <label>Monash Email Address</label>
                {editing ? <input type="email" defaultValue="bwil0001@student.monash.edu" /> : <p>bwil0001@student.monash.edu</p>}
              </div>
            </div>
            <div className="profile-info-item">
              <i className="fas fa-phone"></i>
              <div>
                <label>Mobile Number</label>
                {editing ? <input type="text" defaultValue="0412345678" /> : <p>0412345678</p>}
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
                <p>Undergraduate</p>
              </div>
            </div>
            <div className="profile-info-item">
              <i className="fas fa-university"></i>
              <div>
                <label>Faculty</label>
                <p>Faculty of Science</p>
              </div>
            </div>
            <div className="profile-info-item">
              <i className="fas fa-book"></i>
              <div>
                <label>Course</label>
                <p>Bachelor of Science</p>
              </div>
            </div>
            <div className="profile-info-item">
              <i className="fas fa-calendar-alt"></i>
              <div>
                <label>Year</label>
                <p>3</p>
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
        <img src="/images/default_profile.png" alt="Profile" className="profile-picture" />
        <div className="profile-header-text">
          <h1>Bobby Wilson</h1>
          <button onClick={toggleEdit} className="edit-profile-button">
            {editing ? 'Save' : 'Edit profile'}
          </button>
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
