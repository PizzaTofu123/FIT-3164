import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import './AddElection.css';

const AddElection = ({ user }) => {
  const [clubs, setClubs] = useState([]);
  const [selectedClubId, setSelectedClubId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [positions, setPositions] = useState([{ positionName: "" }]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Fetch club details for the user's representing clubs
  useEffect(() => {
    const fetchClubDetails = async () => {
      if (!user || !user.representingClubs || user.representingClubs.length === 0) {
        setLoading(false);
        return;
      }

      try {
        const clubResponses = await Promise.all(
          user.clubs.map(clubId => fetch(`http://localhost:5000/api/clubs/${clubId}`))
        );
        const clubData = await Promise.all(clubResponses.map(res => res.json()));
        setClubs(clubData);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch club details.");
        setLoading(false);
      }
    };

    if (user.representingClubs && user.representingClubs.length > 0) {
      fetchClubDetails();
    }
  }, [user]);

  // Handle position change
  const handlePositionChange = (index, event) => {
    const newPositions = [...positions];
    newPositions[index].positionName = event.target.value;
    setPositions(newPositions);
  };

  // Add a new position field
  const addPositionField = () => {
    setPositions([...positions, { positionName: "" }]);
  };

  // Remove a position field
  const removePositionField = (index) => {
    const newPositions = positions.filter((_, i) => i !== index);
    setPositions(newPositions);
  };

  // Handle form submission to schedule the election first
  const handleScheduleSubmit = async (e) => {
    e.preventDefault();

    const scheduleData = {
      electionStartDate: new Date(startDate).toISOString(),
      electionEndDate: new Date(endDate).toISOString(),
    };

    console.log("Scheduling election with data:", scheduleData);

    try {
      const response = await fetch(`http://localhost:5000/api/clubs/election/schedule/${selectedClubId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(scheduleData),
      });

      const result = await response.json();
      console.log("Server response for scheduling:", result);

      if (response.ok) {
        // If scheduling is successful, proceed to create elections
        handleCreateElections();
      } else {
        console.error("Failed to schedule the election:", result);
        setError("Failed to schedule the election.");
      }
    } catch (err) {
      console.error("Error scheduling election:", err);
      setError("Error scheduling election.");
    }
  };

  // Handle creating the elections for each position
  const handleCreateElections = async () => {
    for (let position of positions) {
      const newElection = {
        electionName: position.positionName,
        club: selectedClubId,
      };

      console.log("Creating new election with data:", newElection);

      try {
        const response = await fetch('http://localhost:5000/api/elections', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newElection),
        });

        const result = await response.json();
        console.log("Server response for creating election:", result);

        if (!response.ok) {
          console.error("Failed to create the election:", result);
          setError("Failed to create the election.");
        }
      } catch (err) {
        console.error("Error creating election:", err);
        setError("Error creating election.");
      }
    }

    navigate(`/clubrepresentative`);
  };

  if (loading) {
    return <div>Loading clubs...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1 className="main-heading">Add New Election</h1>
      <div className="add-election">
        <form onSubmit={handleScheduleSubmit}>
          <div className="form-fields-container">
            <div>
              <label htmlFor="clubName">Club Name: </label>
              <select
                id="clubName"
                value={selectedClubId}
                onChange={(e) => setSelectedClubId(e.target.value)}
                required
              >
                <option value="">Select a Club</option>
                {clubs.map((club) => (
                  <option key={club._id} value={club._id}>
                    {club.clubName}
                  </option>
                ))}
              </select>
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
                  id={`position-${index}`}
                  placeholder="e.g. President"
                  value={position.positionName}
                  onChange={(e) => handlePositionChange(index, e)}
                  required
                />
                <button 
                  type="button" 
                  className="remove-btn" 
                  onClick={() => removePositionField(index)}
                >
                  &#x2715; {/* Remove button */}
                </button>
                <button 
              type="button" 
              className="add-btn" 
              onClick={addPositionField}
            >
              &#43;
            </button>
              </div>
            ))}
            
          </div>

          <div className="buttons">
            <button type="button" onClick={() => navigate(-1)}>
              Cancel
            </button>
            <button type="submit">Submit Election</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddElection;
