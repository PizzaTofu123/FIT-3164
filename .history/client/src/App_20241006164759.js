import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import Layout from './components/Layout';
import './App.css';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ClubElections from './pages/clubelections';
import Home from './pages/index';
import Profile from './pages/profile';
import EditProfilePage from './pages/EditProfilePage';
import Vote from './pages/vote';
import Preferences from './pages/preferences';
import Results from './pages/results';
import ClubDetails from './pages/ClubDetails';
import ClubRepresentative from './pages/clubrepresentative';
import AddElection from './pages/AddElection';
import EditElection from './pages/EditElection';
import ViewResults from './pages/resultsCR';
import EducationDetails from './pages/EducationDetails';
import SignUpConfirmation from './components/SignUpConfirmation';
import EditCandidates from './components/EditCandidates';
import CandidateProfile from './components/CandidateProfile';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const [data, setData] = useState([{}]);

  // Getting data from backend and setting it into the backendData variable
  useEffect(() => {
    fetch('http://localhost:5000/api/')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.error(err));
  }, []);

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
    localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
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

  // **New Function to handle log out**
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserProfile({});
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userProfile');
  };

  return (
    <Router>
      <div>
        {/* Conditionally render the NavBar only if the user is logged in */}
        {isLoggedIn && <NavBar user={userProfile} />}

        {/* Show login confirmation message */}
        {showLoginMessage && (
          <div className="login-confirmation">
            Successfully logged in!
          </div>
        )}

        {/* Use Layout for transitions */}
        <Layout>
          <Routes>
            <Route path="/" element={isLoggedIn ? <Home user={userProfile}/> : <Navigate to="/signin" replace /> } />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/education-details" element={<EducationDetails />} />
            <Route path="/club-details" element={<ClubDetails />} />
            <Route path="/signup-confirmation" element={<SignUpConfirmation />} />
            <Route path="/signin" element={<SignIn handleLogin={handleLogin} />} />

            {isLoggedIn ? (
              <>
                <Route path="/clubelections" element={<ClubElections user={userProfile} />} />
                <Route path="/profile" element={<Profile user={userProfile} handleLogout={handleLogout} />} />
                <Route path="/edit-profile" element={<EditProfilePage user={userProfile} onSave={handleSaveProfile} />} />
                <Route path="/vote/:clubName" element={<Vote user={userProfile} />} />
                <Route path="/preferences/:clubName" element={<Preferences />} />
                <Route path="/results/:clubName" element={<Results />} />
                <Route path="/clubrepresentative" element={<ClubRepresentative user={userProfile} />} />
                <Route path="/add-election" element={<AddElection user={userProfile} />} />
                <Route path="/edit-election/:clubId" element={<EditElection />} />
                <Route path="/view-results/:clubName" element={<ViewResults />} />
                <Route path="/edit-candidates/:electionId" element={<EditCandidates />} />
                <Route path="/edit-candidate/:clubName/:candidateId" element={<CandidateProfile />} />
                <Route path="/add-candidate/:clubName/:position" element={<CandidateProfile />} />
              </>
            ) : (
              <Route path="*" element={<Navigate to="/signin" replace />} />
            )}
          </Routes>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
