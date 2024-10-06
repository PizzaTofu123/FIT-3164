import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Vote.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Vote({ user }) {
  const location = useLocation();
  const navigate = useNavigate();
  const clubName = decodeURIComponent(location.pathname.split("/").pop());
  const [positions, setPositions] = useState([]);
  const [candidates, setCandidates] = useState({});
  const [selectedCandidates, setSelectedCandidates] = useState({});
  const [selectedCandidateDetails, setSelectedCandidateDetails] = useState(null);
  const [error, setError] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false); // State for confirmation popup

  useEffect(() => {
    const fetchClubDetailsAndCandidates = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/clubs/');
        if (!response.ok) {
          throw new Error('Error fetching clubs');
        }
        const clubs = await response.json();
        const club = clubs.find(club => club.clubName === clubName);

        if (club) {
          const positions = club.elections.map(election => ({
            electionName: election.electionName,
            electionId: election._id,
            candidateIds: election.candidates,
          }));
          setPositions(positions);

          const groupedCandidates = {};
          for (const position of positions) {
            const candidates = await fetchCandidatesByIds(position.candidateIds);
            groupedCandidates[position.electionName] = candidates;
          }
          setCandidates(groupedCandidates);
        } else {
          throw new Error(`Club not found: ${clubName}`);
        }
      } catch (error) {
        console.error('Error fetching club and candidates:', error);
        setError(`Error fetching club and candidates: ${error.message}`);
      }
    };

    fetchClubDetailsAndCandidates();
  }, [clubName]);

  const fetchCandidatesByIds = async (candidateIds) => {
    const candidates = [];
    for (const candidateId of candidateIds) {
      try {
        const candidateResponse = await fetch(`http://localhost:5000/api/candidates/${candidateId}`);
        if (!candidateResponse.ok) {
          throw new Error(`Error fetching candidate ${candidateId}`);
        }
        const candidate = await candidateResponse.json();
        candidates.push(candidate);
      } catch (error) {
        console.error(`Error fetching candidate ${candidateId}:`, error);
      }
    }
    return candidates;
  };

  const handleVote = (position, candidateId) => {
    setSelectedCandidates({
      ...selectedCandidates,
      [position]: candidateId
    });
  };

  const handleConfirmVote = async () => {
    try {
      for (const position in selectedCandidates) {
        const candidateId = selectedCandidates[position];
        const positionData = positions.find(pos => pos.electionName === position);
        const electionId = positionData.electionId;
        const candidateData = candidates[position].find(candidate => candidate._id === candidateId);

        // Prepare the vote data
        const voteData = {
          userId: user._id,           // User ID from the user object
          electionId,                 // The election ID for the current position
          candidateId,                // The candidate ID selected by the user
          level: candidateData.level, // Candidate's level
          faculty: candidateData.faculty, // Candidate's faculty
          course: candidateData.course,   // Candidate's course
          year: candidateData.year        // Candidate's year
        };

        // POST request to submit the vote
        const response = await fetch('http://localhost:5000/api/votes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(voteData)
        });

        if (!response.ok) {
          throw new Error('Failed to submit vote');
        }
      }

      console.log("Vote submitted successfully for:", selectedCandidates);
      setShowConfirmation(false); // Close the confirmation modal after submission
    } catch (error) {
      console.error('Error submitting vote:', error);
      setError(`Error submitting vote: ${error.message}`);
    }
  };

  const handleShowConfirmation = () => {
    setShowConfirmation(true); // Show the confirmation modal
  };

  const handleCancelVote = () => {
    setShowConfirmation(false); // Close the confirmation modal without submitting
  };

  const handleViewCampaign = (candidate) => {
    setSelectedCandidateDetails(candidate);
  };

  const handleCloseModal = () => {
    setSelectedCandidateDetails(null);
  };

  const renderCandidates = (position) => {
    const candidatesList = candidates[position] || [];
    return (
      <div className="vote-section">
        <h3 className="vote-subheader">{position} Candidates</h3>
        <div className="vote-card-container">
          {candidatesList.map((candidate) => (
            <div
              key={candidate._id}
              className={`vote-card ${selectedCandidates[position] === candidate._id ? 'selected' : ''}`}
              onClick={() => handleVote(position, candidate._id)}
            >
              <div className="candidate-avatar">
                <img src="/images/default_profile.png" alt="Profile" />
              </div>
              <div className="candidate-info">
                <p className="candidate-name">{candidate.firstName} {candidate.lastName}</p>
                <p className="candidate-details-text">{candidate.course}</p>
                <p className="candidate-details-text">Year {candidate.year}</p>
              </div>
              <button className="view-campaign-btn" onClick={() => handleViewCampaign(candidate)}>View Campaign</button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="vote-page">
      <div className="vote-header">
        <button className="vote-back-button" onClick={() => navigate('/clubrepresentative')}>
          ←
        </button>
        Voting for {clubName}
      </div>
      {positions.length > 0 ? (
        positions.map((position, index) => (
          <div key={index}>
            {renderCandidates(position.electionName)}
          </div>
        ))
      ) : (
        <p>No positions found for this club.</p>
      )}
      <button className="confirm-vote-btn" onClick={handleShowConfirmation}>Confirm Vote</button>

      {/* Confirmation Popup */}
      {showConfirmation && (
        <div className="confirmation-popup">
          <div className="confirmation-content">
            <h2>Confirm Your Vote</h2>
            <p>Are you sure you want to submit your vote?</p>
            <div className="confirmation-buttons">
              <button className="confirm-btn" onClick={handleConfirmVote}>Yes, Submit</button>
              <button className="cancel-btn" onClick={handleCancelVote}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {selectedCandidateDetails && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedCandidateDetails.firstName} {selectedCandidateDetails.lastName}</h2>
              <button className="close-btn" onClick={handleCloseModal}>×</button>
            </div>
            <div className="modal-body">
              <div className="modal-info">
                <div className="modal-avatar">
                  <img src="/images/default_profile.png" alt="Profile" />
                </div>
                <div className="modal-candidate-details">
                  <p><strong>Course:</strong> {selectedCandidateDetails.course}</p>
                  <p><strong>Year:</strong> {selectedCandidateDetails.year}</p>
                </div>
              </div>
              <p><strong>Campaign Description:</strong></p>
              <p>{selectedCandidateDetails.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Vote;
