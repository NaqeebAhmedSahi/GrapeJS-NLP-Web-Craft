// src/components/Prompt.js
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../../styles/User/prompt.css'; // Ensure to copy your prompt.css into the src/components folder
import "../../styles/User/loginPage.css"; // Add your custom styles here
import { IonIcon } from "@ionic/react";

import { logoWebComponent } from "ionicons/icons";

const Prompt = () => {
  return (
    <div>
       <header className="home-header">
      <Link to="/" className="logo">
        <IonIcon icon={logoWebComponent} /> Grapes: NLP Web Craft
      </Link>
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/features">Features</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>
    </header>
      <div className="home">
        <div className="portable"></div>
        <div className="container">
          <h2 className="text-center mb-4 text-white">Select Your Project Type</h2>
          <p className="text-center text-white mb-4">
            Choose the type of AI-powered web builder you'd like to create. Whether it's for an E-commerce site, a personal blog, or a portfolio, we've got you covered!
          </p>

          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
              <input type="radio" id="prompt1" name="prompt" className="radio-box" />
              <label htmlFor="prompt1" className="radio-label">
                <strong>E-commerce Builder</strong>
                <br />
                Create a powerful online store with AI-generated layouts, product pages, and shopping cart functionality.
              </label>
            </div>

            <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
              <input type="radio" id="prompt2" name="prompt" className="radio-box" />
              <label htmlFor="prompt2" className="radio-label">
                <strong>Blog Builder</strong>
                <br />
                Start your own blog with beautiful templates, AI-generated content suggestions.
              </label>
            </div>

            <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
              <input type="radio" id="prompt3" name="prompt" className="radio-box" />
              <label htmlFor="prompt3" className="radio-label">
                <strong>Portfolio Builder</strong>
                <br />
                Showcase your skills and <ion-icon name="send-outline"></ion-icon> projects with an AI-designed portfolio that highlights your work in the best way possible.
              </label>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-md-8 col-sm-12 mx-auto">
              <label htmlFor="website-input" className="text-white">You can write a prompt for the creation of your specific website:</label>
              <div className="input-group">
                <input type="text" id="website-input" className="form-control" placeholder="e.g., 'I want to build an e-commerce site for handmade crafts that includes product categories, user reviews, and a shopping cart.'" aria-label="Project Details" aria-describedby="submit-btn" />
                <div className="input-group-append">
                  <button className="btn btn-primary" type="button" id="submit-btn">
                    <ion-icon name="send-outline"></ion-icon>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="home-footer">
        <p className="text-center">&copy; 2024 Grapes: NLP Web Craft. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Prompt;
