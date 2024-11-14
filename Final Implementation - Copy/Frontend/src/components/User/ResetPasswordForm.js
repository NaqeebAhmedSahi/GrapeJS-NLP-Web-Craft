// ResetPasswordForm.js
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/User/ResetPasswordForm.css";

const ResetPasswordForm = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/auth/reset-password', {
        token,
        newPassword,
      });
      setMessage(response.data.message);
      setIsSuccess(true); // Indicate success
    } catch (error) {
      setMessage('Error resetting password. Please try again.');
      setIsSuccess(false); // Indicate failure
      console.error('Error resetting password:', error);
    }
  };

  const handleRedirect = () => {
    navigate("/");
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
      <div className="reset-password-form p-4 shadow rounded-circle-card">
        <h2 className="text-center mb-4">Reset Password</h2>
        
        {/* Display alert message */}
        {message && (
          <div className={`alert ${isSuccess ? 'alert-success' : 'alert-danger'} text-center`} role="alert">
            {message}
          </div>
        )}

        <form onSubmit={handleResetPassword}>
          <div className="form-group mb-3">
            <label className="form-label">New Password</label>
            <input
              type="password"
              className="form-control rounded-pill"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 mb-3 rounded-pill">
            Reset Password
          </button>
          <button onClick={handleRedirect} type="button" className="btn btn-outline-secondary w-100 rounded-pill">
            Back to Home
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
