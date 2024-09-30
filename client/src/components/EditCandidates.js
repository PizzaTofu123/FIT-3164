import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './EditCandidates.css'; // Import the updated unique CSS

function EditCandidates() {
  const { clubName } = useParams(); // Fetch clubName from route parameters
  const [elections, setElections] = useState([]);
  const [error, setError] = useState('');
  
  // Fetch the election details for the club
  useEffect(() => {
    const fetchElections = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/elections?clubName=${clubName}`);
        if (!response.ok) {
          throw new Error('Failed to fetch election details');
        }
        const data = await response.json();
        setElections(data);
      } catch (err) {
        setError('Error fetching election details');
      }
    };
    
    fetchElections();
  }, [clubName]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="candidates-page">
      <h2 className="candidates-header">Edit Candidates</h2>
      {elections.length > 0 ? (
        elections.map((election) => (
          <div key={election._id} className="candidates-section">
            <h3 className="candidates-subheader">{election.electionName} Candidates</h3>
            <div className="candidates-card-container">
              {election.candidates.map((candidateId, index) => (
                <div key={candidateId} className="candidates-card">
                  <div className="candidates-icon">+</div>
                  <p>Candidate {index + 1}</p>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p>No elections found for this club.</p>
      )}
    </div>
  );
}

export default EditCandidates;
