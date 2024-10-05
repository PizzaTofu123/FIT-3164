import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Vote.css'; // New CSS for the Vote page
import '@fortawesome/fontawesome-free/css/all.min.css'; // Font Awesome for icons

function Vote() {
  const location = useLocation();
  const navigate = useNavigate();
  const clubName = decodeURIComponent(location.pathname.split("/").pop());
  const [positions, setPositions] = useState([]); // Holds the positions for the election
  const [candidates, setCandidates] = useState({});
  const [selectedCandidates, setSelectedCandidates] = useState({});
  const [error, setError] = useState('');

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

  const handleConfirmVote = () => {
    // Handle the vote submission
    console.log("Voted for candidates:", selectedCandidates);
    navigate('/confirmation'); // Redirect to confirmation page
  };

  const handleBackClick = () => {
    navigate('/');
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
              <button className="view-campaign-btn">View campaign</button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="vote-page">
      <div className="vote-header">
        <button className="vote-back-button" onClick={handleBackClick}>
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
      <button className="confirm-vote-btn" onClick={handleConfirmVote}>Confirm Vote</button>
    </div>
  );
}

export default Vote;
