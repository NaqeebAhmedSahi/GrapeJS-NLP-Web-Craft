import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/User/aboutUs.css'; // Ensure to have this CSS file
import Header from "./Header";
import Footer from "./Footer";

const AboutUs = () => {
    return (
        <div className="bg-light">
           <Header/>

            <section className="about">
                <div className="container py-5">
                    <h1 className="text-center">About Us</h1>
                    <p className="text-center mb-5">
                        At Grapes: NLP Web Craft, we are dedicated to revolutionizing the way you build websites using AI technology.
                    </p>

                    <div className="row">
                        <div className="col-md-4 mb-4">
                            <div className="card shadow h-100">
                                <div className="card-body">
                                    <h5 className="card-title">Our Mission</h5>
                                    <p className="card-text">To empower individuals and businesses with innovative web design solutions that enhance creativity and efficiency.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-4">
                            <div className="card shadow h-100">
                                <div className="card-body">
                                    <h5 className="card-title">Our Vision</h5>
                                    <p className="card-text">To be the leading platform in AI-driven web development, enabling seamless creativity and functionality.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-4">
                            <div className="card shadow h-100">
                                <div className="card-body">
                                    <h5 className="card-title">Our Values</h5>
                                    <p className="card-text">Innovation, integrity, and collaboration are at the heart of everything we do, ensuring a supportive environment for all.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <h2 className="text-center mt-5">Meet Our Team</h2>
                    <div className="row mt-4">
                        <div className="col-md-4 mb-4">
                            <div className="card shadow h-100">
                                <div className="card-body text-center">
                                    <h5 className="card-title">John Doe</h5>
                                    <p className="card-text">CEO & Founder</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-4">
                            <div className="card shadow h-100">
                                <div className="card-body text-center">
                                    <h5 className="card-title">Jane Smith</h5>
                                    <p className="card-text">Chief Technology Officer</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-4">
                            <div className="card shadow h-100">
                                <div className="card-body text-center">
                                    <h5 className="card-title">Emily Johnson</h5>
                                    <p className="card-text">Lead Designer</p>
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

export default AboutUs;
