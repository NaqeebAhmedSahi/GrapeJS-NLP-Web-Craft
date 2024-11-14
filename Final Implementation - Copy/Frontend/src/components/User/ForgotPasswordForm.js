import React, { useState } from "react";

const ForgotPasswordForm = ({ toggleForm }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message); // Notify user of success
      } else {
        alert(data.message || 'Error sending reset email.'); // Notify user of error
      }
    } catch (error) {
      console.error('Error during password reset request:', error);
      alert('Server error. Please try again later.');
    }
  };

  return (
    <div className="wrapper-login slide-in">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-box">
          <input 
            type="email" 
            required 
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
          />
          <label>Enter Your Email</label>
        </div>
        <button type="submit" className="btn">
          Send Reset Link
        </button>
        <div className="register-link">
          <p>
            Remembered your password?{" "}
            <button onClick={() => toggleForm("signIn")} className="link-button">
              Sign In
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
