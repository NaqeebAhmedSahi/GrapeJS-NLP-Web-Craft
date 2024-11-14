import React, { useState } from 'react';
import '../../styles/Admin/admin-signin.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminSignIn = () => {
  const [formData, setFormData] = useState({
    adminEmail: '',
    adminPassword: '',
  });
  const navigate = useNavigate(); // Hook to programmatically navigate

  // Form submission handler
  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/admin/signin', formData);
      // Handle successful sign-in
      console.log("Sign-in successful:", response.data);
      
      // Store adminId in local storage
      localStorage.setItem('adminId', response.data.adminId); // Save adminId for future use

      // Redirect to admin dashboard
      navigate('/admin_dashboard');
    } catch (error) {
      // Handle error (e.g., invalid credentials)
      console.error("Sign-in error:", error.response?.data?.message || error.message);
      alert("Failed to sign in. Please check your credentials.");
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  return (
    <div>
      {/* Logo Section */}
      <header className="text-center my-4">
        <h1>GrapeJs: NLP Web Craft</h1>
      </header>

      {/* Sign-In Form */}
      <div className="signin-container">
        <h2>Admin Sign In</h2>
        <form onSubmit={handleSignIn}>
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
          <button type="submit" className="btn btn-primary btn-block btn-signin">
            Sign In
          </button>
        </form>

        {/* "Don't have an account?" section */}
        <div className="text-center mt-4">
          <p>
            Don't have an account?{' '}
            <Link to="/adminSignup" className="signup-link">
              Sign Up
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

export default AdminSignIn;
