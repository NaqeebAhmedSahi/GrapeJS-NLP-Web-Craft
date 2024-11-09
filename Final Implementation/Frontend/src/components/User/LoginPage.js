import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/User/loginPage.css"; // Add your custom styles here

import {useNavigate, useLocation } from "react-router-dom"; // Import useLocation
import SignInForm from './SignInForm'; // Import SignInForm
import SignUpForm from './SignUpForm'; // Import SignUpForm
import ForgotPasswordForm from './ForgotPasswordForm'; // Import ForgotPasswordForm
import ResetPasswordForm from './ResetPasswordForm'; // Import ResetPasswordForm
import Header from "./Header";
import Footer from "./Footer";
const LoginPage = () => {
  const [activeForm, setActiveForm] = useState("signIn");
  const [titleText, setTitleText] = useState("");
  const [descriptionText, setDescriptionText] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Manage login state

  const navigate = useNavigate(); // Hook for programmatic navigation
  const location = useLocation(); // Hook for accessing the current location

  const typeWriterEffect = (text, speed, callback) => {
    let i = 0;
    const type = () => {
      if (i < text.length) {
        callback(text.slice(0, i + 1));
        i++;
        setTimeout(type, speed);
      }
    };
    type();
  };

  useEffect(() => {
    typeWriterEffect(
      "Unleash Your Creativity with AI-Powered Web Design",
      100,
      setTitleText
    );

    setTimeout(() => {
      typeWriterEffect(
        `Grapes: NLP Web Craft is the future of web design. Powered by advanced Natural Language Processing (NLP) technology, this AI-driven platform transforms your ideas into fully functional websites effortlessly.`,
        50,
        setDescriptionText
      );
    }, 2000);
  }, []);

  useEffect(() => {
    // Check for the token in the URL
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    if (token) {
      setActiveForm('resetPassword'); // Set the active form to resetPassword if a token is found
    }
  }, [location.search]); // Run this effect whenever the search in the location changes

  const toggleForm = (formName) => {
    setActiveForm(formName);
  };

  const handleSignInSuccess = () => {
    setIsLoggedIn(true); // Set login state to true on successful sign-in
  };

  const handleSignUpSuccess = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 5000); // Hide notification after 5 seconds
  };

  const handleGetStartedClick = () => {
    if (isLoggedIn) {
      navigate("/prompt"); // Navigate to the prompt page if logged in
    } else {
      alert("Please Sign In/Sign Up first!"); // Show alert if not logged in
    }
  };

  return (
    <div>
      <Header />
      <main className="home">
        <div className="content">
          {showNotification && (
            <div className="alert alert-success alert-dismissible fade show" role="alert">
              {notificationMessage}
              <button type="button" className="close" onClick={() => setShowNotification(false)}>
                <span>&times;</span>
              </button>
            </div>
          )}
          <h2>{titleText}</h2>
          <p>{descriptionText}</p>
          <button className="btn-done" onClick={handleGetStartedClick}>
            Get Started
          </button>
        </div>
        {activeForm === "signIn" && <SignInForm toggleForm={toggleForm} setShowNotification={setShowNotification} setNotificationMessage={setNotificationMessage} handleSignInSuccess={handleSignInSuccess} />}
        {activeForm === "signUp" && <SignUpForm toggleForm={toggleForm} handleSignUpSuccess={handleSignUpSuccess} />}
        {activeForm === "forgotPassword" && <ForgotPasswordForm toggleForm={toggleForm} />}
        {activeForm === "resetPassword" && <ResetPasswordForm toggleForm={toggleForm} />} {/* Add this line */}
      </main>
      <Footer />
    </div>
  );
};





export default LoginPage;
