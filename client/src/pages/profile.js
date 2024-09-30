import React, { useState, useEffect } from 'react';
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
  const [clubsDetails, setClubsDetails] = useState([]);
  const [representativeClubs, setRepresentativeClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClubDetails = async () => {
      try {
        // Fetch details for each clubId in the user.clubs array
        const clubDetailsPromises = user.clubs.map(clubId =>
          fetch(`http://localhost:5000/api/clubs/${clubId}`).then(res => res.json())
        );
        
        // Fetch details for each clubId in the user.representingClubs array
        const representativeClubPromises = user.representingClubs.map(clubId =>
          fetch(`http://localhost:5000/api/clubs/${clubId}`).then(res => res.json())
        );

        const fetchedClubsDetails = await Promise.all(clubDetailsPromises);
        const fetchedRepresentativeClubs = await Promise.all(representativeClubPromises);

        setClubsDetails(fetchedClubsDetails);
        setRepresentativeClubs(fetchedRepresentativeClubs);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch club data.");
        setLoading(false);
      }
    };

    if (user && (user.clubs.length > 0 || user.representingClubs.length > 0)) {
      fetchClubDetails();
    } else {
      setLoading(false); // If user has no clubs or representingClubs, stop loading
    }
  }, [user.clubs, user.representingClubs]);

  if (loading) {
    return <div>Loading club data...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

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
            <h3>Member of Clubs:</h3>
            {clubsDetails.length > 0 ? (
              <ul>
                {clubsDetails.map((club) => (
                  <div className="profile-info-item" key={club._id}>
                    <i className="fas fa-users"></i>
                    <li>
                      <label>{club.clubName}</label>
                    </li>
                  </div>
                ))}
              </ul>
            ) : (
              <p>No clubs found.</p>
            )}

            <h3>Representative of Clubs:</h3>
            {representativeClubs.length > 0 ? (
              <ul>
                {representativeClubs.map((club) => (
                  <div className="profile-info-item" key={club._id}>
                    <i className="fas fa-user-tie"></i>
                    <li>
                      <label>{club.clubName}</label>
                    </li>
                  </div>
                ))}
              </ul>
            ) : (
              <p>Not a representative of any clubs.</p>
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
        <img 
          src={user.profilePicture ? user.profilePicture : "/images/default_profile.png"} 
          alt="Profile" 
          className="profile-picture" 
        />
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
