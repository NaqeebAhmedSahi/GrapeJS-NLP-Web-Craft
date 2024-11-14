import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Prompt from './components/User/Prompt'; 
import AboutUs from './components/User/AboutUs';
import ContactUs from './components/User/ContactUs';
import Features from './components/User/Features';
import LoginPage from './components/User/LoginPage'; 
import ResetPasswordForm from './components/User/ResetPasswordForm'; 
import AdminDashboard from './components/Admin/AdminDashboard';
import AdminSignIn from './components/Admin/AdminSignIn';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminSignUp from './components/Admin/AdminSignUp';
import Notifications from './components/Admin/Notifications';
import ManageTemplates from './components/Admin/ManageTemplates';
import Users from './components/Admin/Users';
import ViewPrompts from './components/Admin/ViewPrompts';
import SuperAdminPage from './components/Admin/SuperAdminPage'; // Import SuperAdminPage
import Home from "./Home";
import Editor from "./Editor";
import ProtectedRoute from './components/ProtectedRoute'; // Import your ProtectedRoute component
import AdminProtectedRoute from './components/AdminProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* User */}
        <Route path="/" element={<LoginPage />} /> {/* Set LoginPage as the home page */}
        <Route path="/prompt" element={<ProtectedRoute element={<Prompt />} />} />
        <Route path="/about" element={<ProtectedRoute element={<AboutUs />} />} />
        <Route path="/contact" element={<ProtectedRoute element={<ContactUs />} />} />
        <Route path="/features" element={<ProtectedRoute element={<Features />} />} />
        <Route path="/reset-password/:token" element={<ResetPasswordForm />} /> 
        <Route exact path="/home" element={<ProtectedRoute element={<Home />} />} />
        <Route exact path="/editor/:pageId" element={<ProtectedRoute element={<Editor />} />} />
        {/* Admin */}
        <Route path="/admin_dashboard" element={<AdminProtectedRoute element={<AdminDashboard />} />} />
        <Route path="/adminSignIn" element={<AdminSignIn />} />
        <Route path="/adminSignup" element={<AdminSignUp />} />
        <Route path="/notifications" element={<AdminProtectedRoute element={<Notifications />} />} />
        <Route path="/templates" element={<AdminProtectedRoute element={<ManageTemplates />} />} />
        <Route path="/users" element={<AdminProtectedRoute element={<Users />} />} />
        <Route path="/view_prompts" element={<AdminProtectedRoute element={<ViewPrompts />} />} />
        
        {/* Only accessible if user is a superadmin */}
        {localStorage.getItem('adminId') && (
          <Route path="/super_admin" element={<AdminProtectedRoute element={<SuperAdminPage isSuperAdmin={true} />} />} />
        )}
        
      </Routes>
    </Router>
  );
}

export default App;
