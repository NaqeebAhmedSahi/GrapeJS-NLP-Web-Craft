import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/User/contactUs.css'; // Ensure to have this CSS file
import { IonIcon } from "@ionic/react";
import { logoFacebook, logoTwitter, logoInstagram, logoLinkedin } from "ionicons/icons"; // Import necessary icons
import Header from "./Header";
import Footer from "./Footer";
const ContactUs = () => {
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const token = localStorage.getItem('token'); // Assuming you're storing the JWT token in local storage
            const response = await fetch('http://localhost:8080/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Attach the token if available
                },
                body: JSON.stringify(formData)
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const result = await response.json();
            console.log(result); // Log success message
            setSubmitted(true);
            setErrorMessage(''); // Clear any previous error message
            setFormData({ name: '', email: '', message: '' }); // Reset form
        } catch (error) {
            console.error('Error submitting form:', error); // Log the error for debugging
            setErrorMessage('There was an error submitting your message. Please try again.'); // Set error message
        }
    };
    
    

    const handleSocialClick = (social) => {
        console.log(`${social} button clicked!`); // Placeholder for social link functionality
    };

    return (
        <div className="bg-light">
            < Header/>
            
            <section className="contact-section py-5">
                <div className="container">
                    <h1 className="text-center m-5">Get in Touch</h1>

                    <div className="row">
                        {/* Contact Form */}
                        <div className="col-md-8 mb-4">
                            <div className="card shadow-lg border-0">
                                <div className="card-body p-4">
                                    <h4 className="card-title text-center mb-4">Contact Us</h4>
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <label htmlFor="name">Full Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="name"
                                                name="name"
                                                placeholder="Your Name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">Email Address</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="email"
                                                name="email"
                                                placeholder="Your Email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="message">Message</label>
                                            <textarea
                                                className="form-control"
                                                id="message"
                                                name="message"
                                                rows="5"
                                                placeholder="Your Message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                            ></textarea>
                                        </div>
                                        <div className="text-center">
                                            <button type="submit" className="btn btn-primary btn-block">Send Message</button>
                                        </div>
                                    </form>
                                    {submitted && (
                                        <div className="alert alert-success mt-3" role="alert">
                                            Your message has been sent successfully!
                                        </div>
                                    )}
                                    {errorMessage && (
                                        <div className="alert alert-danger mt-3" role="alert">
                                            {errorMessage}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Contact Details & Social Links */}
                        <div className="col-md-4">
                            <div className="card shadow-lg border-0 mb-4">
                                <div className="card-body p-4 text-center">
                                    <h5 className="card-title mb-3">Contact Information</h5>
                                    <p className="card-text">
                                        <strong>Email:</strong> support@grapesnlpwebcraft.com<br />
                                        <strong>Phone:</strong> +1 (555) 123-4567
                                    </p>
                                </div>
                            </div>

                            <div className="card shadow-lg border-0">
                                <div className="card-body p-4 text-center">
                                    <h5 className="card-title mb-3">Follow Us</h5>
                                    <div className="row social-links">
                                        <div className="col-6 mb-3">
                                            <button
                                                className="btn btn-outline-primary btn-lg d-flex align-items-center justify-content-center"
                                                onClick={() => handleSocialClick('Facebook')}
                                            >
                                                <IonIcon icon={logoFacebook} className="mr-2" /> Facebook
                                            </button>
                                        </div>
                                        <div className="col-6 mb-3">
                                            <button
                                                className="btn btn-outline-info btn-lg d-flex align-items-center justify-content-center"
                                                onClick={() => handleSocialClick('Twitter')}
                                            >
                                                <IonIcon icon={logoTwitter} className="mr-2" /> Twitter
                                            </button>
                                        </div>
                                        <div className="col-6 mb-3">
                                            <button
                                                className="btn btn-outline-danger btn-lg d-flex align-items-center justify-content-center"
                                                onClick={() => handleSocialClick('Instagram')}
                                            >
                                                <IonIcon icon={logoInstagram} className="mr-2" /> Instagram
                                            </button>
                                        </div>
                                        <div className="col-6 mb-3">
                                            <button
                                                className="btn btn-outline-secondary btn-lg d-flex align-items-center justify-content-center"
                                                onClick={() => handleSocialClick('LinkedIn')}
                                            >
                                                <IonIcon icon={logoLinkedin} className="mr-2" /> LinkedIn
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </div>
    );
};

export default ContactUs;
