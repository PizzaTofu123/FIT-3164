import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import './AddElection.css';

const EditElection = () => {
  const [clubName, setClubName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [positions, setPositions] = useState([{ positionName: "" }]); // Manage the positions
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { clubId } = useParams();

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

  // Fetch club and associated elections data
  useEffect(() => {
    const fetchClubData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/clubs/${clubId}`);
        const clubData = await response.json();
        console.log("Fetched club data:", clubData);

        // Set club details
        setClubName(clubData.clubName);
        setStartDate(formatDateForInput(clubData.electionStartDate));
        setEndDate(formatDateForInput(clubData.electionEndDate));

        // Fetch elections based on the club's elections array
        const electionPromises = clubData.elections.map(electionId =>
          fetch(`http://localhost:5000/api/elections/${electionId}`).then(res => res.json())
        );
        const fetchedElections = await Promise.all(electionPromises);
        console.log("Fetched elections data:", fetchedElections);

        // Map fetched elections to position names
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

  // Handle form submission for updating the election
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedElectionData = {
      clubName,
      electionStartDate: new Date(startDate).toISOString(),
      electionEndDate: new Date(endDate).toISOString(),
      positions: positions.map(position => ({
        electionName: position.positionName,
        electionId: position.electionId
      }))
    };

    console.log("Updating election with data:", updatedElectionData);

    try {
      const response = await fetch(`http://localhost:5000/api/clubs/${clubId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedElectionData),
      });

      const result = await response.json();
      console.log("Server response:", result);

      if (response.ok) {
        navigate(`/clubrepresentative`);
      } else {
        console.error("Failed to update the election:", result);
        setError("Failed to update the election.");
      }
    } catch (err) {
      console.error("Error updating election:", err);
      setError("Error updating election.");
    }
  };

  if (loading) {
    return <div>Loading club and election data...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1 className="main-heading">Edit Election</h1>
      <div className="add-election">
        <form onSubmit={handleSubmit}>
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

          <div>
            <h3>Positions</h3>
            {positions.map((position, index) => (
              <div key={index} className="position-field">
                <label htmlFor={`position-${index}`}>Position {index + 1}: </label>
                <input
                  type="text"
                  id={`position-${index}`}
                  value={position.positionName}
                  onChange={(e) => handlePositionChange(index, e)}
                  required
                />
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
