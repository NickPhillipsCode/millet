import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import SignUpPage from './pages/signup';
import BrandSettings from './pages/BrandSettings';
import InfluencerSettings from './pages/InfluencerSettings';
import ProfilePage from './pages/Profile';
import OverviewPage from './pages/Overview'; 
import SettingsPage from './pages/Settings'; 
import Footer from './components/Footer';
import LoginPage from './pages/Login';
import Campaign from './pages/Campaign';
import InfluencerBrandDashboard from './pages/InfluencerBrandDashboard';
import Marketplace from './pages/Marketplace'; 
import TermsAndConditions from './pages/Legal/TermsAndConditions';
import PrivatePolicy from './pages/Legal/PrivatePolicy';
import InfluencerAccountPage from './pages/InfluencerDashboard/Account'; 
import InfluencerSettingsPage from './pages/InfluencerDashboard/Settings'; // Import the new page

import ProtectedRoute from './components/ProtectedRoutes'; // Import ProtectedRoute

import './App.css';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
    const [userType, setUserType] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);

        if (token) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                setUserType(payload.user_type); // Set the userType based on the token
            } catch (error) {
                console.error("Invalid token format", error);
                setUserType(null);
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setUserType(null);
    };

    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <Header isAuthenticated={isAuthenticated} />
                                <HeroSection />
                                <Footer />
                            </>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            isAuthenticated ? (
                                <Navigate to={userType === 'brand' ? '/overview' : '/InfluencerDashboard/Account'} />
                            ) : (
                                <LoginPage setIsAuthenticated={setIsAuthenticated} />
                            )
                        }
                    />
                    <Route
                        path="/signup"
                        element={
                            isAuthenticated ? (
                                <Navigate to={userType === 'brand' ? '/overview' : '/InfluencerDashboard/Account'} />
                            ) : (
                                <SignUpPage />
                            )
                        }
                    />

                    {/* Protected Routes */}
                    <Route
                        path="/brand-settings"
                        element={
                            <ProtectedRoute requiredUserType="brand">
                                <BrandSettings />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/influencer-settings"
                        element={
                            <ProtectedRoute requiredUserType="influencer">
                                <InfluencerSettings />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            isAuthenticated ? (
                                <ProfilePage onLogout={handleLogout} />
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    <Route
                        path="/overview"
                        element={
                            <ProtectedRoute requiredUserType="brand">
                                <OverviewPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/settings"
                        element={
                            isAuthenticated ? (
                                <SettingsPage />
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    <Route
                        path="/campaigns"
                        element={
                            isAuthenticated ? (
                                <Campaign />
                            ) : (
                                <Navigate to="/" />
                            )
                        }
                    />
                    <Route
                        path="/influencer-brand-dashboard"
                        element={
                            isAuthenticated ? (
                                <InfluencerBrandDashboard />
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    <Route
                        path="/marketplace"
                        element={
                            isAuthenticated ? (
                                <Marketplace />
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    <Route
                        path="/InfluencerDashboard/Account"
                        element={
                            <ProtectedRoute requiredUserType="influencer">
                                <InfluencerAccountPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
    path="/InfluencerDashboard/settings"
    element={
        <ProtectedRoute requiredUserType="influencer">
            <InfluencerSettingsPage />
        </ProtectedRoute>
    }
/>
                    <Route
                        path="/legal/terms"
                        element={<TermsAndConditions />}
                    />
                    <Route
                        path="/legal/privacy"
                        element={<PrivatePolicy />}
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
