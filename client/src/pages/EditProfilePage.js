import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './EditProfilePage.css';

function EditProfilePage({ user, onSave }) {
  const [profileData, setProfileData] = useState(user);
  const [clubsDetails, setClubsDetails] = useState([]);
  const [representativeClubs, setRepresentativeClubs] = useState([]);
  const [allClubs, setAllClubs] = useState([]); // To store all clubs from the backend
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Format the date as YYYY-MM-DD for the input date field
  useEffect(() => {
    if (user && user.dob) {
      const formattedDob = new Date(user.dob).toISOString().substr(0, 10); // Format date as YYYY-MM-DD
      setProfileData((prevData) => ({
        ...prevData,
        dob: formattedDob,
      }));
    }
  }, [user]);

  // Fetch club data based on user's clubs and representative clubs
  useEffect(() => {
    const fetchClubDetails = async () => {
      try {
        const clubDetailsPromises = user.clubs.map(clubId =>
          fetch(`http://localhost:5000/api/clubs/${clubId}`).then(res => res.json())
        );
        const representativeClubPromises = user.representingClubs.map(clubId =>
          fetch(`http://localhost:5000/api/clubs/${clubId}`).then(res => res.json())
        );
        const fetchedClubsDetails = await Promise.all(clubDetailsPromises);
        const fetchedRepresentativeClubs = await Promise.all(representativeClubPromises);

        setClubsDetails(fetchedClubsDetails);
        setRepresentativeClubs(fetchedRepresentativeClubs);
      } catch (err) {
        console.error("Failed to fetch club data.");
      }
    };

    if (user && (user.clubs.length > 0 || user.representingClubs.length > 0)) {
      fetchClubDetails();
    }
  }, [user]);

  // Validation functions
  const validateEmail = (email) => email.includes('@student.monash.edu');

  const validateDob = (dob) => {
    const selectedDate = new Date(dob);
    const currentDate = new Date();
    const hundredYearsAgo = new Date();
    hundredYearsAgo.setFullYear(currentDate.getFullYear() - 100);
    return selectedDate <= currentDate && selectedDate >= hundredYearsAgo;
  };

  const validateMonashID = (monashID) => /^\d{8}$/.test(monashID);

  const capitalizeName = (name) => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear any previous error message
    setErrorMessage('');

    // Personal Information validations
    if (!profileData.firstName || !profileData.lastName || !profileData.dob || !profileData.studentId || !profileData.email) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    if (!validateDob(profileData.dob)) {
      setErrorMessage("Invalid Date of Birth.");
      return;
    }

    if (!validateEmail(profileData.email)) {
      setErrorMessage("Invalid Monash Email. It must include '@student.monash.edu'.");
      return;
    }

    if (!validateMonashID(profileData.studentId)) {
      setErrorMessage("Invalid Monash ID. It must be exactly 8 digits.");
      return;
    }

    // Capitalize first and last names before saving
    const firstName = capitalizeName(profileData.firstName);
    const lastName = capitalizeName(profileData.lastName);

    const updatedProfileData = {
      ...profileData,
      firstName: firstName,
      lastName: lastName,
    };

    try {
      const response = await fetch(`/api/users/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProfileData),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        onSave(updatedUser);
        navigate('/profile');
      } else {
        console.error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Dynamic course selection based on level
  const getCourses = () => {
    if (profileData.level === 'Undergraduate') {
      return undergraduateCourses;
    } else if (profileData.level === 'Postgraduate') {
      return postgraduateCourses;
    }
    return [];
  };

  // Arrays for Undergraduate and Postgraduate courses
  const undergraduateCourses = [
    "Accounting", "Actuarial Science", "Arts", "Biomedical Science", "Business", "Computer Science", "Engineering",
    "Information Technology", "Law", "Medicine", "Pharmacy", "Science"
  ];

  const postgraduateCourses = [
    "Accounting", "Advanced Engineering", "Business Administration", "Data Science", "Law", "Medicine", "Public Health", "Science"
  ];

  return (
    <form className="edit-profile-container" onSubmit={handleSubmit}>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <div className="profile-header">
        <img src={profileData.profilePicture || '/images/default_profile.png'} alt="Profile" className="profile-picture" />
        <input type="file" accept="image/*" onChange={(e) => handleChange(e)} />
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
          <select name="level" value={profileData.level} onChange={handleChange} className="education-input">
            <option value="">Select Level</option>
            <option value="Undergraduate">Undergraduate</option>
            <option value="Postgraduate">Postgraduate</option>
          </select>
        </div>
        <div className="form-group">
          <label>Course</label>
          <select name="course" value={profileData.course} onChange={handleChange} className="education-input">
            <option value="">Select Course</option>
            {getCourses().map((course, index) => (
              <option key={index} value={course}>{course}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Faculty</label>
          <select name="faculty" value={profileData.faculty} onChange={handleChange} className="education-input">
            <option value="">Select Faculty</option>
            <option value="Faculty of Art, Design and Architecture">Faculty of Art, Design and Architecture</option>
            <option value="Faculty of Arts">Faculty of Arts</option>
            <option value="Faculty of Business and Economics">Faculty of Business and Economics</option>
            <option value="Faculty of Education">Faculty of Education</option>
            <option value="Faculty of Engineering">Faculty of Engineering</option>
            <option value="Faculty of Information Technology">Faculty of Information Technology</option>
            <option value="Faculty of Law">Faculty of Law</option>
            <option value="Faculty of Medicine, Nursing and Health Sciences">Faculty of Medicine, Nursing and Health Sciences</option>
            <option value="Faculty of Science">Faculty of Science</option>
          </select>
        </div>
        <div className="form-group">
          <label>Second Faculty</label>
          <select name="secondFaculty" value={profileData.secondFaculty} onChange={handleChange} className="education-input">
            <option value="">Select Second Faculty</option>
            <option value="Faculty of Art, Design and Architecture">Faculty of Art, Design and Architecture</option>
            <option value="Faculty of Arts">Faculty of Arts</option>
            <option value="Faculty of Business and Economics">Faculty of Business and Economics</option>
            <option value="Faculty of Education">Faculty of Education</option>
            <option value="Faculty of Engineering">Faculty of Engineering</option>
            <option value="Faculty of Information Technology">Faculty of Information Technology</option>
            <option value="Faculty of Law">Faculty of Law</option>
            <option value="Faculty of Medicine, Nursing and Health Sciences">Faculty of Medicine, Nursing and Health Sciences</option>
            <option value="Faculty of Science">Faculty of Science</option>
          </select>
        </div>
        <div className="form-group">
          <label>Year</label>
          <input type="number" name="year" value={profileData.year} onChange={handleChange} min="1" />
        </div>
      </div>

      <div className="form-section">
        <h3>Club Information</h3>
        <h4>Member of Clubs:</h4>
        {clubsDetails.length > 0 ? (
          clubsDetails.map((club, index) => (
            <div key={club._id} className="form-group">
              <label>Club {index + 1}</label> {/* Display club name */}
              <input type="text" value={club.clubName} disabled />
            </div>
          ))
        ) : (
          <p>No clubs found.</p>
        )}

        <h4>Representative of Clubs:</h4>
        {representativeClubs.length > 0 ? (
          representativeClubs.map((club, index) => (
            <div key={club._id} className="form-group">
              <label>Club Representative {index + 1}</label> {/* Display club name */}
              <input type="text" value={club.clubName} disabled />
            </div>
          ))
        ) : (
          <p>Not a representative of any clubs.</p>
        )}
      </div>

      <button type="submit" className="save-button">Save</button>
    </form>
  );
}

export default EditProfilePage;
