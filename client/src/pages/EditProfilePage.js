import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './EditProfilePage.css';

function EditProfilePage({ user, onSave }) {
  const [profileData, setProfileData] = useState(user);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileData((prevData) => ({
        ...prevData,
        profilePicture: reader.result,
      }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(profileData); // Save the updated profile data
    navigate('/profile'); // Redirect to the Profile page
  };

  return (
    <form className="edit-profile-container" onSubmit={handleSubmit}>
      <div className="profile-header">
        <img src={profileData.profilePicture} alt="Profile" className="profile-picture" />
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </div>
      <div className="form-section">
        <h3>Personal Information</h3>
        <div className="form-group">
          <label>First Name</label>
          <input type="text" name="firstName" value={profileData.firstName} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input type="text" name="lastName" value={profileData.lastName} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Pronouns</label>
          <input type="text" name="pronouns" value={profileData.pronouns} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Monash Student ID</label>
          <input type="text" name="studentID" value={profileData.studentID} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Monash Email Address</label>
          <input type="email" name="email" value={profileData.email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Mobile Number</label>
          <input type="text" name="mobile" value={profileData.mobile} onChange={handleChange} />
        </div>
      </div>
      <div className="form-section">
        <h3>Educational Information</h3>
        <div className="form-group">
          <label>Level</label>
          <input type="text" name="level" value={profileData.level} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Year</label>
          <input type="text" name="year" value={profileData.year} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Course</label>
          <input type="text" name="course" value={profileData.course} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Faculty</label>
          <input type="text" name="faculty" value={profileData.faculty} onChange={handleChange} />
        </div>
      </div>
      <button type="submit" className="save-button">Save</button>
    </form>
  );
}

export default EditProfilePage;
