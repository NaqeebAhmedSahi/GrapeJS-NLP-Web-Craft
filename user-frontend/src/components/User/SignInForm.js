// SignInForm.js
import React, { useState } from "react";
import axios from "axios";

const SignInForm = ({ toggleForm, setShowNotification, setNotificationMessage, handleSignInSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signin', {
        email,
        password,
      });

      // Notify the user of successful sign in
      setNotificationMessage(response.data.message);
      setShowNotification(true);
      localStorage.setItem('token', response.data.token); // Store token
      handleSignInSuccess(); // Notify parent component of successful sign-in
    } catch (error) {
      const message = error.response ? error.response.data.message : 'Server error. Please try again later.';
      setNotificationMessage(message);
      setShowNotification(true);
    }
  };

  return (
    <div className="wrapper-login slide-in">
      <h2>Member Login</h2>
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
        <div className="input-box">
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>Enter Your Password</label>
        </div>
        <button type="submit" className="btn">
          Login
        </button>
        <div className="register-link">
          <p>
            Don't have an account?{" "}
            <button onClick={() => toggleForm("signUp")} className="link-button">
              Register
            </button>
          </p>
          <p>
            <button onClick={() => toggleForm("forgotPassword")} className="link-button">
              Forgot Password?
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
