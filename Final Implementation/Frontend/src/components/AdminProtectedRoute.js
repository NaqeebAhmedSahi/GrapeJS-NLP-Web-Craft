// AdminProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminProtectedRoute = ({ element }) => {
    const adminId = localStorage.getItem('adminId'); // Check if adminId exists in local storage

    // If adminId is not found, redirect to the login page
    return adminId ? element : <Navigate to="/adminSignIn" />;
};

export default AdminProtectedRoute;
