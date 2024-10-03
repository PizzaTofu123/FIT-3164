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

  useEffect(() => {
    const fetchClubData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/clubs/${clubId}`);
        const clubData = await response.json();

        setClubName(clubData.clubName);
        setStartDate(formatDateForInput(clubData.electionStartDate));
        setEndDate(formatDateForInput(clubData.electionEndDate));

        const electionPromises = clubData.elections.map(election =>
          fetch(`http://localhost:5000/api/elections/${election._id}`).then(res => res.json())
        );
        const fetchedElections = await Promise.all(electionPromises);

        const newPositions = fetchedElections.map(election => ({
          positionName: election.electionName,
          electionId: election._id
        }));
        setPositions(newPositions);

        setLoading(false);
      } catch (err) {
        setError("Failed to fetch club or election data.");
        setLoading(false);
      }
    };

    fetchClubData();
  }, [clubId]);

  const handleDeleteElection = async () => {
    if (window.confirm(`Are you sure you want to delete the election for ${clubName}?`)) {
      try {
        const response = await fetch(`http://localhost:5000/api/clubs/deleteClubElection/${clubId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          alert(`Election for ${clubName} deleted successfully.`);
          navigate('/clubrepresentative');  // Redirect after deletion
        } else {
          console.error("Failed to delete election");
          alert("Failed to delete election. Please try again.");
        }
      } catch (err) {
        console.error("Error deleting election:", err);
        alert("An error occurred while deleting the election.");
      }
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
        <form>
          {/* Your existing form fields */}
          <div className="buttons">
            <button type="button" onClick={() => navigate(-1)}>Cancel</button>
            <button type="submit">Update Election</button>
            <button type="button" className="delete-btn" onClick={handleDeleteElection}>
              Delete Election
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditElection;
