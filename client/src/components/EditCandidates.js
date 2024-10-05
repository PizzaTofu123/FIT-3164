import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './EditCandidates.css';

function EditCandidates() {
  const location = useLocation();
  const navigate = useNavigate(); // useNavigate hook to handle navigation
  const clubName = decodeURIComponent(location.pathname.split("/").pop()); // Extract and decode club name from URL
  const [positions, setPositions] = useState([]);
  const [error, setError] = useState('');
  const [candidates, setCandidates] = useState({
    'President': [],
    'Vice President': []
  }); // Placeholder state for candidates per position

  // Fetch the club's details and its elections based on the clubName
  useEffect(() => {
    const fetchClubDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/clubs/name/${encodeURIComponent(clubName)}`);
        if (!response.ok) {
          throw new Error(`Error fetching club details for ${clubName}`);
        }
        const clubData = await response.json();

        // Extract the elections (positions) from the fetched club data
        if (clubData.elections && clubData.elections.length > 0) {
          setPositions(clubData.elections.map(election => election.electionName));
        } else {
          setPositions([]); // No positions found
        }
      } catch (error) {
        setError(`Error fetching club details for ${clubName}: ${error.message}`);
      }
    };

    fetchClubDetails();
  }, [clubName]);

  if (error) {
    return <div>{error}</div>;
  }

  const renderCandidates = (position) => {
    const candidatesList = candidates[position] || []; // Get candidates for each position
    return (
      <div className="edit-candidates-section">
        <h3 className="edit-candidates-subheader">{position} Candidates</h3>
        <div className="edit-candidates-card-container">
          {candidatesList.map((candidate, index) => (
            <div key={index} className="edit-candidates-card">
              <div className="edit-candidates-icon">+</div> {/* Placeholder for candidate icon */}
              <p>{candidate.name || `Candidate ${index + 1}`}</p> {/* Candidate Name */}
            </div>
          ))}
          {/* Add empty candidate card for adding new candidates */}
          <div className="edit-candidates-card" onClick={() => handleAddCandidate(position)}>
            <div className="edit-candidates-icon">+</div>
            <p>Add Candidate</p>
          </div>
        </div>
      </div>
    );
  };

  const handleAddCandidate = (position) => {
    navigate(`/add-candidate/${clubName}/${position}`); // Pass the club name and position
  };  

  // Handle back button click
  const handleBackClick = () => {
    navigate('/clubrepresentative'); // Navigate to the clubrepresentative page
  };

  return (
    <div className="edit-candidates-page">
      <div className="edit-candidates-header">
        <button className="edit-candidates-back-button" onClick={handleBackClick}>
          ← {/* Unicode left arrow */}
        </button>
        Edit Candidates for {clubName}
      </div>
      {positions.length > 0 ? (
        positions.map((position, index) => (
          <div key={index}>
            {renderCandidates(position)}
          </div>
        ))
      ) : (
        <p>No positions found for this club.</p>
      )}
    </div>
  );
}

export default EditCandidates;
