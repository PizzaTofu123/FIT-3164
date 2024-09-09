import React, { useState } from "react";
import './AddElection.css';

const AddElection = () => {
  const [clubName, setClubName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [resultsVisibility, setResultsVisibility] = useState("membersAndOrganisers");

  return (
    <div>
      <h1 className="main-heading">Add New Election</h1>
    <div className="add-election">
      <form>
        <div>
          <label htmlFor="clubName">Club Name: </label>
          <select
            id="clubName"
            value={clubName}
            onChange={(e) => setClubName(e.target.value)}
            placeholder="Enter a brief description of the election"
            required
          >
            <option value="">Select a Club</option>
            {/* {clubs.map((club) => (
              <option key={club.id} value={club.name}>
                {club.name}
              </option>
            ))} */}
          </select>
        </div>
        <div>
          <label htmlFor="description">Description: </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter a brief description of the election"
            required
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
          <label>Post-Election Results Visibility: </label>
          <select
            value={resultsVisibility}
            onChange={(e) => setResultsVisibility(e.target.value)}
          >
            <option value="membersAndOrganisers">To Members and Organisers</option>
            <option value="organisers">Only to Organisers</option>
          </select>
        </div>
        <div className="buttons">  
          <button type="button" onClick={() => alert("Cancelled!")}>Cancel</button>
          {/* <button type="button" onClick={() => alert("Saved as draft!")}>Save as Draft</button> */}
          <button type="submit">Submit Election</button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default AddElection;
