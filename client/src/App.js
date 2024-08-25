// src/App.js
import React, { useEffect, useState } from 'react';
import NavBar from './components/NavBar';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ClubElections from './pages/clubelections';
import Home from './pages/index';
import Profile from './pages/profile';
import EditProfilePage from './pages/EditProfilePage';
import Vote from './pages/vote';
import Preferences from './pages/preferences';
import Results from './pages/results';
import MemberSignUp from './pages/MemberSignUp'; // Import the member-specific sign-up form component
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const [backendData, setBackendData] = useState([{}]);

  // State to check if the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  // Simulated function for logging in (you'll replace this with real authentication)
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // Getting data from backend and setting it into the backendData variable
  useEffect(() => {
    fetch('/api')
      .then(response => response.json())
      .then(data => {
        setBackendData(data);
      });
  }, []);

  return (
    <div>
      <Router>
        {/* Conditionally render the NavBar only if the user is logged in */}
        {isLoggedIn && <NavBar user={userProfile} />}
        <Routes>
          <Route path="/" element={isLoggedIn ? <Home /> : <SignIn />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/member-signup" element={<MemberSignUp />} /> {/* Add this new route */}
          {/* Redirect to SignIn if not logged in */}
          {isLoggedIn ? (
            <>
              <Route path="/clubelections" element={<ClubElections />} />
              <Route path="/profile" element={<Profile user={userProfile} />} />
              <Route path="/edit-profile" element={<EditProfilePage user={userProfile} onSave={handleSaveProfile} />} />
              <Route path="/vote/:clubName" element={<Vote />} />
              <Route path="/preferences/:clubName" element={<Preferences />} />
              <Route path="/results/:clubName" element={<Results />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/signin" replace />} />
          )}
        </Routes>
      {/* Render the NavBar at the top of the page */}
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/clubelections" element={<ClubElections />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/vote/:clubName" element={<Vote />} />
        <Route path="/preferences/:clubName" element={<Preferences />} />
        <Route path="/results/:clubName" element={<Results />} />
      </Routes>
      </Router>
      {/* Render the backend data below the NavBar */}
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
