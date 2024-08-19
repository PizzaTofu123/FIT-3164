import React, { useEffect, useState } from 'react';
import NavBar from './components/NavBar'; // Adjust the path if necessary

function App() {
  const [backendData, setBackendData] = useState([{}]);

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
      {/* Render the NavBar at the top of the page */}
      <NavBar />

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
