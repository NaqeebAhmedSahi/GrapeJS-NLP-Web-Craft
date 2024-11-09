import React, { useState } from "react";

const SignUpForm = ({ toggleForm, handleSignUpSuccess }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        handleSignUpSuccess('Successfully signed up! Now you can sign in.');
        setUsername('');
        setEmail('');
        setPassword('');
      } else {
        handleSignUpSuccess(data.message || 'Sign up failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during sign up:', error);
      handleSignUpSuccess('Server error. Please try again later.');
    }
  };

  return (
    <div className="wrapper-login slide-in">
      <h2>Member Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-box">
          <input 
            type="text" 
            name="username" 
            required 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Enter Your Username</label>
        </div>
        <div className="input-box">
          <input 
            type="email" 
            name="email" 
            required 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Enter Your Email</label>
        </div>
        <div className="input-box">
          <input 
            type="password" 
            name="password" 
            required 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>Enter Your Password</label>
        </div>
        <button type="submit" className="btn">
          Sign Up
        </button>
        <div className="register-link1">
          <p>
            Already have an account?{" "}
            <button onClick={() => toggleForm("signIn")} className="link-button">
              Sign In
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
