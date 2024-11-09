import React, { useState } from "react";
import axios from "axios";

const SignInForm = ({ toggleForm, setShowNotification, setNotificationMessage, handleSignInSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    setError(''); // Reset error message
    console.log('API URL:', process.env.REACT_APP_API_URL); 

    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/signin`, {
            email,
            password,
        });

        // Check if the response contains a token and user ID
        if (response.data.token && response.data.userId) {
            // Store the token and user ID in local storage
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userId', response.data.userId); // Assuming userId is returned in response

            // Notify the user of successful sign in
            setNotificationMessage(response.data.message);
            setShowNotification(true);
            handleSignInSuccess(); // Notify parent component of successful sign-in
        } else {
            throw new Error('Invalid response from server'); // Handle unexpected response structure
        }
    } catch (error) {
        // Handle any errors during the sign-in process
        const message = error.response ? error.response.data.message : 'Server error. Please try again later.';
        setError(message); // Set error message
        setNotificationMessage(message);
        setShowNotification(true);
    } finally {
        setLoading(false); // Stop loading
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
            aria-describedby="emailHelp" // Accessibility improvement
          />
          <label>Enter Your Email</label>
        </div>
        <div className="input-box">
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-describedby="passwordHelp" // Accessibility improvement
          />
          <label>Enter Your Password</label>
        </div>
        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {error && <p className="error-message">{error}</p>} {/* Display error message */}
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
