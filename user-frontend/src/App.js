import React, { useState, useRef } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Prompt from './components/User/Prompt'; 
// import AboutUs from './components/User/AboutUs';
// import ContactUs from './components/User/ContactUs';
// import Features from './components/User/Features';
// import LoginPage from './components/User/LoginPage'; 
// import ResetPasswordForm from './components/User/ResetPasswordForm'; 
// import AdminDashboard from './components/Admin/AdminDashboard';
// import AdminSignIn from './components/Admin/AdminSignIn';
import 'bootstrap/dist/css/bootstrap.min.css';
// import AdminSignUp from './components/Admin/AdminSignUp';
// import Notifications from './components/Admin/Notifications';
// import ManageTemplates from './components/Admin/ManageTemplates';
// import Users from './components/Admin/Users';
// import ViewPrompts from './components/Admin/ViewPrompts';
// import SuperAdminPage from './components/Admin/SuperAdminPage'; // Import SuperAdminPage



// Dummy user for example (replace with actual authentication logic)
// Replace with actual user state or context

function App() {
  const [name, setName] = useState('');
  const inputRef = useRef(null);
  
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Input Value:', inputRef.current.value);
    inputRef.current.focus();
    inputRef.current.value = " ";
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Name:  </label>
        <input type="text" ref={inputRef} value={name} onChange={(event) => setName(event.target.value)} />
        <h1>{inputRef.current.value}</h1>
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}

export default App;
