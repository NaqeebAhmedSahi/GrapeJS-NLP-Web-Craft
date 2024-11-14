// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
    const userId = localStorage.getItem('userId'); // Check if userId exists in local storage

    // If userId is not found, redirect to the login page
    return userId ? element : <Navigate to="/" />;
};

export default ProtectedRoute;
