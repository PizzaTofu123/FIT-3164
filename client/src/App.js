import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import './App.css';

function App() {
  const [backendData, setBackendData] = useState([{}]);

  // Getting data from backend and setting it into the backendData variable
  useEffect(() => {
    fetch('/api').then(
      response => response.json()
    ).then(
      data => { setBackendData(data); }
    );
  }, []); // Only runs on the first render of the component

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/profile" element={<Profile />} />
          {/* Add other routes here if necessary */}
        </Routes>
        <div>
          {
            backendData.map((dataObj, index) => {
              return (
                <p key={index} style={{ fontSize: 20, color: 'black' }}>
                  {dataObj.name}
                </p>
              );
            })
          }
        </div>
      </div>
    </Router>
  );
}

export default App;
