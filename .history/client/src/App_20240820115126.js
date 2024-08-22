import React, { useEffect, useState } from 'react';
import NavBar from './components/NavBar'; // Adjust the path if necessary
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ClubElections from './pages/clubelections';
import Home from './pages/index';
import Profile from './pages/profile';
import Vote from './pages/vote';
import Preferences from './pages/preferences';
import Results from './pages/results';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  

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
