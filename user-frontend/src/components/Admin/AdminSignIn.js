import React from 'react';
import '../../styles/Admin/admin-signin.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const AdminSignIn = () => {
  // Form submission handler
  const handleSignIn = (e) => {
    e.preventDefault();
    // Handle the sign-in logic here (e.g., make an API request)
    console.log("Admin sign-in form submitted.");
  };

  return (
    <div>
      {/* Logo Section */}
      <header className="text-center my-4">
        {/* <img src="logo.png" alt="GrapeJs: NLP Web Craft" className="logo"> */}
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
            <Link to="/admin_signup" className="signup-link">
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
