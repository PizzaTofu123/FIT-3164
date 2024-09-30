import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import './AddElection.css';

const EditElection = () => {
  const [clubName, setClubName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [positions, setPositions] = useState([]); // Manage positions fetched from elections
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { clubId } = useParams(); // Get clubId from URL parameters

  const formatDateForInput = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  // Fetch club data from the backend and retrieve positions (elections)
  useEffect(() => {
    const fetchClubData = async () => {
      try {
        console.log("Fetching club data for clubId:", clubId);
        const response = await fetch(`http://localhost:5000/api/clubs/${clubId}`);
        const clubData = await response.json();
        console.log("Club data fetched:", clubData);

        setClubName(clubData.clubName);
        setStartDate(formatDateForInput(clubData.electionStartDate));
        setEndDate(formatDateForInput(clubData.electionEndDate));

        // Fetch elections (positions) based on the club's elections array
        const electionPromises = clubData.elections.map(electionId =>
          fetch(`http://localhost:5000/api/elections/${electionId}`).then(res => res.json())
        );
        const fetchedElections = await Promise.all(electionPromises);
        console.log("Fetched elections:", fetchedElections);

        // Set positions (election names) for the elections
        const newPositions = fetchedElections.map(election => ({
          positionName: election.electionName,
          electionId: election._id
        }));
        setPositions(newPositions);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching club or election data:", err);
        setError("Failed to fetch club or election data.");
        setLoading(false);
      }
    };

    fetchClubData();
  }, [clubId]);

  // Handle position change
  const handlePositionChange = (index, event) => {
    const newPositions = [...positions];
    newPositions[index].positionName = event.target.value;
    setPositions(newPositions);
  };

  // Add a new position field
  const addPositionField = () => {
    setPositions([...positions, { positionName: "", electionId: null }]); // New positions have no electionId
  };

  // Remove a position field (deletes an election if it has an electionId)
  const removePositionField = async (index) => {
    const positionToRemove = positions[index];

    if (positionToRemove.electionId) {
      try {
        // Call API to delete the election from the backend
        await fetch(`http://localhost:5000/api/elections/${positionToRemove.electionId}`, {
          method: 'DELETE',
        });
        console.log(`Deleted position (electionId: ${positionToRemove.electionId})`);
      } catch (err) {
        console.error("Error deleting position:", err);
      }
    }

    // Remove the position from the state
    const newPositions = positions.filter((_, i) => i !== index);
    setPositions(newPositions);
  };

  // Handle form submission for updating both schedule and positions
  const handleSubmit = async (e) => {
    e.preventDefault();

    const scheduleData = {
      electionStartDate: new Date(startDate).toISOString(),
      electionEndDate: new Date(endDate).toISOString(),
    };

    const updatedPositions = positions.filter(pos => pos.positionName !== ""); // Filter out empty positions

    try {
      // Update schedule
      const scheduleResponse = await fetch(`http://localhost:5000/api/clubs/election/schedule/${clubId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(scheduleData),
      });

      // Update or create positions (elections) for each position
      const positionPromises = updatedPositions.map(position => {
        if (position.electionId) {
          // Update existing election
          return fetch(`http://localhost:5000/api/elections/${position.electionId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ electionName: position.positionName })
          });
        } else {
          // Create a new election
          return fetch(`http://localhost:5000/api/elections`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ electionName: position.positionName, club: clubId })
          });
        }
      });

      const positionResults = await Promise.all(positionPromises);

      if (scheduleResponse.ok && positionResults.every(res => res.ok)) {
        navigate(`/clubrepresentative`);
      } else {
        setError("Failed to update election details.");
      }
    } catch (err) {
      console.error("Error updating election:", err);
      setError("Error updating election.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1 className="main-heading">Edit Election</h1>
      <div className="add-election">
        <form onSubmit={handleSubmit}>
          <div className="form-fields-container">
            <div>
              <label htmlFor="clubName">Club Name: </label>
              <input
                type="text"
                id="clubName"
                value={clubName}
                readOnly
              />
            </div>

            <div>
              <label htmlFor="startDate">Start Date & Time: </label>
              <input
                type="datetime-local"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="endDate">End Date & Time: </label>
              <input
                type="datetime-local"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="position-container">
            <h3>Positions</h3>
            {positions.map((position, index) => (
              <div key={index} className="position-field">
                <label htmlFor={`position-${index}`}>Position {index + 1}: </label>
                <input
                  type="text"
                  placeholder="e.g. President"
                  value={position.positionName}
                  onChange={(e) => handlePositionChange(index, e)}
                  required
                />
                {positions.length > 1 && (
                  <button type="button" className="remove-btn" onClick={() => removePositionField(index)}>
                    &#x2715;
                  </button>
                )}
                <button type="button" className="add-btn" onClick={addPositionField}>
              &#43;
            </button>
              </div>
            ))}
            
          </div>

          <div className="buttons">
            <button type="button" onClick={() => navigate(-1)}>Cancel</button>
            <button type="submit">Update Election</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditElection;
