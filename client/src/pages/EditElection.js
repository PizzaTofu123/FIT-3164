import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import './AddElection.css';

const EditElection = () => {
  const [clubName, setClubName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
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
  
  // Fetch election data from the backend
  useEffect(() => {
    const fetchElectionData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/clubs/${clubId}`);
        const data = await response.json();
        console.log("Fetched data:", data);
        
        // Populate the form fields with the fetched data
        setClubName(data.clubName);
        setStartDate(formatDateForInput(data.electionStartDate));
        setEndDate(formatDateForInput(data.electionEndDate));
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch election data.");
        setLoading(false);
      }
    };
    
    fetchElectionData();
  }, [clubId]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const updatedElection = {
      electionStartDate: new Date(startDate).toISOString(),
      electionEndDate: new Date(endDate).toISOString(),
    };

    console.log("Updating election with data:", updatedElection);
    
    try {
      const response = await fetch(`http://localhost:5000/api/clubs/election/schedule/${clubId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedElection)
      });

      const result = await response.json();
      console.log("Server response:", result); // Log the server's response
      
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
          <div>
            <label htmlFor="clubName">Club Name: </label>
            <input
                type="text"
                id="clubName"
                value={clubName}
                readOnly 
            />
          </div>

          {/* <div>
            <label htmlFor="description">Description: </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter a brief description of the election"
              required
            />
          </div> */}

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
            <button type="submit">Update Election</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditElection;
