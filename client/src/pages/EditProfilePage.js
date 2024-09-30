import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './EditProfilePage.css';

function EditProfilePage({ user, onSave }) {
  const [profileData, setProfileData] = useState(user);
  const navigate = useNavigate();

  // Ensure that the date of birth is properly formatted
  useEffect(() => {
    if (user && user.dob) {
      const formattedDob = new Date(user.dob).toISOString().substr(0, 10); // Format as YYYY-MM-DD for input type="date"
      setProfileData((prevData) => ({
        ...prevData,
        dob: formattedDob,
      }));
    }
  }, [user]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make an API request to save the updated profile data
      const response = await fetch(`/api/users/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        onSave(updatedUser); // Save the updated user in the parent state
        navigate('/profile'); // Redirect to the profile page
      } else {
        console.error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form className="edit-profile-container" onSubmit={handleSubmit}>
      <div className="profile-header">
        <img src={profileData.profilePicture || '/images/default_profile.png'} alt="Profile" className="profile-picture" />
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
          <label>Date of Birth</label>
          <input type="date" name="dob" value={profileData.dob} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Monash Student ID</label>
          <input type="text" name="studentId" value={profileData.studentId} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Monash Email Address</label>
          <input type="email" name="email" value={profileData.email} onChange={handleChange} />
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
        <div className="form-group">
          <label>Second Faculty</label>
          <input type="text" name="secondFaculty" value={profileData.secondFaculty} onChange={handleChange} />
        </div>
      </div>

      <div className="form-section">
        <h3>Club Information</h3>
        {profileData.clubs && profileData.clubs.length > 0 ? (
          profileData.clubs.map((club, index) => (
            <div key={index} className="form-group">
              <label>{club.clubName}</label>
              <input type="text" value={club.clubName} disabled />
            </div>
          ))
        ) : (
          <p>No clubs found</p>
        )}

        {profileData.representingClubs && profileData.representingClubs.length > 0 && (
          <>
            <h4>Representing Clubs</h4>
            {profileData.representingClubs.map((club, index) => (
              <div key={index} className="form-group">
                <label>{club.clubName}</label>
                <input type="text" value={club.clubName} disabled />
              </div>
            ))}
          </>
        )}
      </div>

      <button type="submit" className="save-button">Save</button>
    </form>
  );
}

export default EditProfilePage;
