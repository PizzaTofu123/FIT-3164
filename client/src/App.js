// src/App.js
import React, { useEffect, useState } from 'react';
import NavBar from './components/NavBar';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ClubElections from './pages/clubelections';
import Home from './pages/index';
import Profile from './pages/profile';
import EditProfilePage from './pages/EditProfilePage';
import Vote from './pages/vote';
import Preferences from './pages/preferences';
import Results from './pages/results';
import MemberSignUp from './pages/MemberSignUp';
import ClubSignUp from './pages/ClubSignUp';
import MembersSignIn from './pages/MembersSignIn';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const [backendData, setBackendData] = useState([{}]);

  // Initialize state from local storage
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const [userProfile, setUserProfile] = useState(() => {
    const storedProfile = localStorage.getItem('userProfile');
    return storedProfile ? JSON.parse(storedProfile) : {};
  });

  // Function to handle profile save
  const handleSaveProfile = (updatedProfile) => {
    setUserProfile(updatedProfile);
  };

  // Function to handle login
  const handleLogin = (profile) => {
    setIsLoggedIn(true);
    setUserProfile(profile);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userProfile', JSON.stringify(profile));
    setShowLoginMessage(true);

    // Hide the message after 3 seconds
    setTimeout(() => {
      setShowLoginMessage(false);
    }, 3000);
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

        {/* Show login confirmation message */}
        {showLoginMessage && (
          <div className="login-confirmation">
            Successfully logged in!
          </div>
        )}

        <Routes>
          <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/signin" replace />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/member-signup" element={<MemberSignUp />} />
          <Route path="/club-signup" element={<ClubSignUp />} />
          <Route path="/members-signin" element={<MembersSignIn handleLogin={handleLogin} />} />

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
      </Router>

      {/* Render the backend data below the NavBar */}
      {backendData.map((dataObj, index) => (
        <p key={index} style={{ fontSize: 20, color: 'black' }}>
          {dataObj.firstName}
        </p>
      ))}
    </div>
  );
}

export default App;
