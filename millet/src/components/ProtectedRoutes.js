// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredUserType }) => {
    const token = localStorage.getItem('token');
    let userType = null;

    if (token) {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            userType = payload.user_type; // Get user type from token
        } catch (error) {
            console.error("Invalid token:", error);
        }
    }

    // Check if user is authenticated and has the correct user type
    if (!token || userType !== requiredUserType) {
        return <Navigate to="/login" />; // Redirect to login if unauthorized
    }

    return children;
};

export default ProtectedRoute;
