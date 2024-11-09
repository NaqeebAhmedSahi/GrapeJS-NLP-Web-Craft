import React, { useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import axios from 'axios';

const ResetPasswordForm = () => {
  const { token } = useParams(); // Extract token from the URL
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/auth/reset-password', {
        token,
        newPassword,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error resetting password. Please try again.');
      console.error('Error resetting password:', error);
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleResetPassword}>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPasswordForm;
