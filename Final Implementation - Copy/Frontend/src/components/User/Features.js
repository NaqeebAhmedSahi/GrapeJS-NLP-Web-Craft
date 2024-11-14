import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../styles/User/loginPage.css"; // Ensure to have this CSS file
import '../../styles/User/contactUs.css'; // Ensure to have this CSS file
import { IonIcon } from "@ionic/react";

import { cartOutline, createOutline, briefcaseOutline, settingsOutline, codeOutline, colorPaletteOutline } from "ionicons/icons"; // Import necessary icons
import Header from "./Header";
import Footer from "./Footer";
const Features = () => {
    return (
        <div className="bg-light">
            <Header/>

            <section className="features py-5">
                <div className="container text-center">
                    <h1 className="m-5">Our Features</h1>
                    <div className="row">
                        {/* Feature 1: E-commerce Website Builder */}
                        <div className="col-md-4 mb-4">
                            <div className="card shadow-lg h-100">
                                <div className="card-body text-center">
                                    <IonIcon icon={cartOutline} style={{ fontSize: '3rem', color: '#17a2b8' }} />
                                    <h5 className="card-title mt-3">E-commerce Website Builder</h5>
                                    <p className="card-text">Create powerful and scalable e-commerce websites with just a few clicks. No coding required, thanks to our user-friendly interface.</p>
                                </div>
                            </div>
                        </div>

                        {/* Feature 2: Blog Creator */}
                        <div className="col-md-4 mb-4">
                            <div className="card shadow-lg h-100">
                                <div className="card-body text-center">
                                    <IonIcon icon={createOutline} style={{ fontSize: '3rem', color: '#17a2b8' }} />
                                    <h5 className="card-title mt-3">Blog Website Maker</h5>
                                    <p className="card-text">Craft professional and engaging blogs effortlessly, with customizable templates and layouts powered by AI-driven design tools.</p>
                                </div>
                            </div>
                        </div>

                        {/* Feature 3: Portfolio Website Maker */}
                        <div className="col-md-4 mb-4">
                            <div className="card shadow-lg h-100">
                                <div className="card-body text-center">
                                    <IonIcon icon={briefcaseOutline} style={{ fontSize: '3rem', color: '#17a2b8' }} />
                                    <h5 className="card-title mt-3">Portfolio Website Maker</h5>
                                    <p className="card-text">Showcase your personal brand or work with stunning portfolio websites. Our platform ensures your projects shine online.</p>
                                </div>
                            </div>
                        </div>

                        {/* Feature 4: Powered by NLP */}
                        <div className="col-md-4 mb-4">
                            <div className="card shadow-lg h-100">
                                <div className="card-body text-center">
                                    <IonIcon icon={settingsOutline} style={{ fontSize: '3rem', color: '#17a2b8' }} />
                                    <h5 className="card-title mt-3">Powered by NLP</h5>
                                    <p className="card-text">Leverage the power of Natural Language Processing to generate website content, automate design, and more with intelligent AI features.</p>
                                </div>
                            </div>
                        </div>

                        {/* Feature 5: API Integration */}
                        <div className="col-md-4 mb-4">
                            <div className="card shadow-lg h-100">
                                <div className="card-body text-center">
                                    <IonIcon icon={codeOutline} style={{ fontSize: '3rem', color: '#17a2b8' }} />
                                    <h5 className="card-title mt-3">API for Seamless Integration</h5>
                                    <p className="card-text">Connect your website to external services or integrate advanced functionality via our comprehensive API solutions.</p>
                                </div>
                            </div>
                        </div>

                        {/* Feature 6: Tons of Customization */}
                        <div className="col-md-4 mb-4">
                            <div className="card shadow-lg h-100">
                                <div className="card-body text-center">
                                    <IonIcon icon={colorPaletteOutline} style={{ fontSize: '3rem', color: '#17a2b8' }} />
                                    <h5 className="card-title mt-3">Tons of Customization</h5>
                                    <p className="card-text">Design your website the way you want with an array of customization options, ensuring that your site is unique and on-brand.</p>
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

export default Features;
