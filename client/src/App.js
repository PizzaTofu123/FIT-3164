import React, { useEffect, useState } from 'react';
import NavBar from './components/NavBar';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ClubElections from './pages/clubelections';
import Home from './pages/index';
import Profile from './pages/profile';
import EditProfilePage from './pages/EditProfilePage'; // Import EditProfilePage
import Vote from './pages/vote';
import Preferences from './pages/preferences';
import Results from './pages/results';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const [backendData, setBackendData] = useState([{}]);

  // Sample user data for demonstration
  const [userProfile, setUserProfile] = useState({
    firstName: 'Bobby',
    lastName: 'Wilson',
    pronouns: 'He/Him',
    studentID: '31234567',
    email: 'bwil0001@student.monash.edu',
    mobile: '0412345678',
    level: 'Undergraduate',
    year: '3',
    course: 'Bachelor of Science',
    faculty: 'Faculty of Science',
    profilePicture: '/images/default_profile.png'
  });

  // Function to handle profile save
  const handleSaveProfile = (updatedProfile) => {
    setUserProfile(updatedProfile);
  };

  // Getting data from backend and setting it into the backendData variable
  useEffect(() => {
    fetch('/api')
      .then(response => response.json())
      .then(data => {
        setBackendData(data);
      });
  }, []); // only runs in the first render of the component

  return (
    <div>
      <Router>
        {/* Pass userProfile to the NavBar component */}
        <NavBar user={userProfile} />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/clubelections" element={<ClubElections />} />
          <Route 
            path="/profile" 
            element={<Profile user={userProfile} />} 
          />
          <Route 
            path="/edit-profile" 
            element={<EditProfilePage user={userProfile} onSave={handleSaveProfile} />} 
          />
          <Route path="/vote/:clubName" element={<Vote />} />
          <Route path="/preferences/:clubName" element={<Preferences />} />
          <Route path="/results/:clubName" element={<Results />} />
        </Routes>
      </Router>

      {/* Render the backend data below the NavBar (if necessary) */}
      {backendData.map((dataObj, index) => {
        return (
          <p key={index} style={{ fontSize: 20, color: 'black' }}>
            {dataObj.firstName}
          </p>
        );
      })}
    </div>
  );
}

export default App;
