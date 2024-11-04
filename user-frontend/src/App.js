import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Prompt from './components/User/Prompt'; 
import AboutUs from './components/User/AboutUs';
import ContactUs from './components/User/ContactUs';
import Features from './components/User/Features';
import LoginPage from './components/User/LoginPage'; // Import LoginPage instead of Home
import ResetPasswordForm from './components/User/ResetPasswordForm'; // Import ResetPasswordForm
import AdminDashboard from './components/Admin/AdminDashboard';
import AdminSignIn from './components/Admin/AdminSignIn';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminSignUp from './components/Admin/AdminSignUp';
import Notifications from './components/Admin/Notifications';
import ManageTemplates from './components/Admin/ManageTemplates';
import Users from './components/Admin/Users';
import ViewPrompts from './components/Admin/ViewPrompts';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} /> {/* Set LoginPage as the home page */}
        <Route path="/prompt" element={<Prompt />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/features" element={<Features />} />
        <Route path="/reset-password/:token" element={<ResetPasswordForm />} /> {/* Add this line */}
        <Route path="/admin_dashboard" element={<AdminDashboard />} />
        <Route path="/adminSignIn" element={<AdminSignIn />} />
        <Route path="/adminSignup" element={<AdminSignUp/>} />
        <Route path="/notifications" element={<Notifications/>} />
        <Route path="/templates" element={<ManageTemplates/>} />
        <Route path="/users" element={<Users />} />
        <Route path="/view_prompts" element={<ViewPrompts />} />
      </Routes>
    </Router>
  );
}

export default App;
