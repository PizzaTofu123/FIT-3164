import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import './AddElection.css';

const AddElection = () => {
  const [clubs, setClubs] = useState([]);
  const [selectedClubId, setSelectedClubId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/clubs');
        const data = await response.json();
        setClubs(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch clubs.");
        setLoading(false);
      }
    };

    fetchClubs();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newElection = {
      electionStartDate: new Date(startDate).toISOString(),
      electionEndDate: new Date(endDate).toISOString(),
    };

    console.log("Creating new election with data:", newElection);
    
    try {
      const response = await fetch(`http://localhost:5000/api/clubs/election/schedule/${selectedClubId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newElection),
      });

      const result = await response.json();
      console.log("Server response:", result);

      if (response.ok) {
        navigate(`/clubrepresentative`);
      } else {
        console.error("Failed to create the election:", result);
        setError("Failed to create the election.");
      }
    } catch (err) {
      console.error("Error creating election:", err);
      setError("Error creating election.");
    }
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
        <form onSubmit={handleSubmit}>
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

          <div className="buttons">
            <button type="button" onClick={() => navigate(-1)}>Cancel</button>
            <button type="submit">Submit Election</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddElection;
