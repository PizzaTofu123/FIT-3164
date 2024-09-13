import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUpConfirmation.css'; // Import the new CSS file

function SignUpConfirmation() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the Sign In page after 3 seconds
    const timer = setTimeout(() => {
      navigate('/signin');
    }, 3000);

    // Cleanup the timer when the component is unmounted
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="signup-confirmation-wrapper">
      <h1 className="signup-confirmation-heading">All done!</h1>
      <div className="signup-confirmation-icon">
        <img src="/images/confirm_logo.png" alt="Success Checkmark" />
      </div>
      <p className="signup-confirmation-message">
        Sign up has been successful! Redirecting to Sign In...
      </p>
    </div>
  );
}

export default SignUpConfirmation;
