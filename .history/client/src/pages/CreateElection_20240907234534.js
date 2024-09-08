import React, { useState } from "react";
import './CreateElection.css'; 

const CreateElection = () => {
  const [clubName, setClubName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [resultsVisibility, setResultsVisibility] = useState("immediately");
  const [isDraft, setIsDraft] = useState(false);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Build election object
    const electionData = {
      clubName,
      description,
      startDate,
      endDate,
      resultsVisibility,
      isDraft,
    };
    // Add logic for saving the election (API call or state update)
    console.log("Election submitted:", electionData);
  };

  // Handle draft saving
  const handleSaveDraft = () => {
    setIsDraft(true);
    handleSubmit();
  };

  // Handle form cancellation
  const handleCancel = () => {
    // Clear the form or redirect to another page
    setClubName("");
    setDescription("");
    setStartDate("");
    setEndDate("");
    setResultsVisibility("immediately");
    console.log("Form cancelled");
  };

  return (
    <div className="create-election">
      <h2>Create New Election</h2>
      <form onSubmit={handleSubmit}>
        {/* Club Name */}
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

        {/* Description */}
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        {/* Start Date */}
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

        {/* End Date */}
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

        {/* Post-Election Results Visibility */}
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

        {/* Buttons */}
        <div className="buttons">
          <button type="submit">Submit Election</button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
          <button type="button" onClick={handleSaveDraft}>
            Save as Draft
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateElection;
