import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

function SignUp() {
  const navigate = useNavigate();

  return (
    <div className="auth-container">
      <img src="/images/monash_logo_login.png" alt="Monash University Logo" className="auth-logo" />
      <h2 className='h2-auth'>Create an account</h2>
      <button className="auth-button" onClick={() => navigate('/member-signup')}>Members</button>
      <button className="auth-button">Committee</button>
      <p className="auth-text">Already have an account?</p>
      <Link to="/" className="auth-link">Sign In</Link>
    </div>
  );
}

export default SignUp;