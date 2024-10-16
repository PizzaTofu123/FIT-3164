import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './EditCandidates.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Ensure Font Awesome is imported

function EditCandidates() {
  const location = useLocation();
  const navigate = useNavigate();
  const clubName = decodeURIComponent(location.pathname.split("/").pop());
  const [positions, setPositions] = useState([]); // Holds the positions for the election
  const [error, setError] = useState('');
  const [candidates, setCandidates] = useState({}); // Holds candidates grouped by position

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

  const handleDeleteCandidate = async (candidateId, position) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this candidate?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:5000/api/candidates/${candidateId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete candidate');
      }

      // Remove the deleted candidate from the UI
      setCandidates((prevCandidates) => ({
        ...prevCandidates,
        [position]: prevCandidates[position].filter((candidate) => candidate._id !== candidateId),
      }));
    } catch (error) {
      console.error('Error deleting candidate:', error);
      setError('Failed to delete candidate. Please try again.');
    }
  };

  const renderCandidates = (position) => {
    const candidatesList = candidates[position] || [];
    return (
      <div className="edit-candidates-section">
        <h3 className="edit-candidates-subheader">{position} Candidates</h3>
        <div className="edit-candidates-card-container">
          <div className="edit-candidates-card" onClick={() => handleAddCandidate(position)}>
            <div className="edit-candidates-icon">+</div>
            <p className="add-candidate-text">Add Candidate</p>
          </div>

          {candidatesList.map((candidate) => (
            <div key={candidate._id} className="edit-candidates-card">
              <div className="candidate-avatar">
                <img src="/images/default_profile.png" alt="Profile" />
              </div>
              <div className="candidate-info">
                <p className="candidate-name">{candidate.firstName} {candidate.lastName}</p>
                <p className="candidate-details-text">{candidate.course}</p>
                <p className="candidate-details-text">Year {candidate.year}</p>
              </div>

              {/* Delete icon using Font Awesome */}
              <div className="delete-icon" onClick={() => handleDeleteCandidate(candidate._id, position)}>
                <i className="fas fa-trash"></i>
              </div>

              <button className="view-campaign-btn" onClick={() => handleEditClick(candidate._id)}>Edit candidate</button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const handleAddCandidate = (position) => {
    navigate(`/add-candidate/${clubName}/${position}`);
  };

  const handleEditClick = (candidateId) => {
    navigate(`/edit-candidate/${clubName}/${candidateId}`);
  };

  const handleBackClick = () => {
    navigate('/clubrepresentative');
  };

  return (
    <div className="edit-candidates-page">
      <div className="edit-candidates-header">
        <button className="edit-candidates-back-button" onClick={handleBackClick}>
          ←
        </button>
        Edit Candidates for {clubName}
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
    </div>
  );
}

export default EditCandidates;
