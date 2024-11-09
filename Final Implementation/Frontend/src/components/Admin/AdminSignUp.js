import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import { Link } from 'react-router-dom';
const AdminSignUp = () => {
  const [formData, setFormData] = useState({
    adminName: '',
    adminEmail: '',
    adminPassword: '',
    adminConfirmPassword: ''
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { adminName, adminEmail, adminPassword, adminConfirmPassword } = formData;

    // Basic validation for password match
    if (adminPassword !== adminConfirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/admin/signup', {
        adminName,
        adminEmail,
        adminPassword
      });
      setSuccess(response.data.message);
      setError(null);
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
      setSuccess(null);
    }
  };

  return (
    <div>
      {/* Logo Section */}
      <header className="text-center my-4">
        <h1>GrapeJs: NLP Web Craft</h1>
      </header>

      {/* Sign-Up Form */}
      <div className="signup-container">
        <h2>Admin Sign Up</h2>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="adminName">Admin Name</label>
            <input
              type="text"
              className="form-control"
              id="adminName"
              placeholder="Enter your name"
              value={formData.adminName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="adminEmail">Email address</label>
            <input
              type="email"
              className="form-control"
              id="adminEmail"
              placeholder="Enter email"
              value={formData.adminEmail}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="adminPassword">Password</label>
            <input
              type="password"
              className="form-control"
              id="adminPassword"
              placeholder="Password"
              value={formData.adminPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="adminConfirmPassword">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="adminConfirmPassword"
              placeholder="Confirm Password"
              value={formData.adminConfirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block btn-signup">
            Sign Up
          </button>
        </form>

        {/* "Have an account?" section */}
        <div className="text-center mt-4">
          <p>
            Already have an account?{' '}
            <Link to="/admin_signin" className="signin-link">
              Sign In
            </Link>
          </p>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="footer">
        <p>&copy; 2024 GrapeJs: NLP Web Craft | All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default AdminSignUp;
