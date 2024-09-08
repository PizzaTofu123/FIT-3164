import React, { useState } from "react";
import './CreateElection.css';

const CreateElection = () => {
  const [clubName, setClubName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [resultsVisibility, setResultsVisibility] = useState("immediately");

  return (
    <div className="create-election">
      
      <form>
        <div>
          <label htmlFor="clubName">Club Name:</label>
          <input
            type="text"
            id="clubName"
            value={clubName}
            onChange={(e) => setClubName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="startDate">Start Date & Time:</label>
          <input
            type="datetime-local"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="endDate">End Date & Time:</label>
          <input
            type="datetime-local"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Post-Election Results Visibility:</label>
          <select
            value={resultsVisibility}
            onChange={(e) => setResultsVisibility(e.target.value)}
          >
            <option value="immediately">Immediately</option>
            <option value="organisers">Only to Organisers</option>
          </select>
        </div>
        <div className="buttons">
          <button type="submit">Submit Election</button>
          <button type="button" onClick={() => alert("Cancelled!")}>Cancel</button>
          <button type="button" onClick={() => alert("Saved as draft!")}>Save as Draft</button>
        </div>
      </form>
    </div>
  );
};

export default CreateElection;
