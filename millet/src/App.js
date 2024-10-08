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
import InfluencerBrandDashboard from './pages/InfluencerBrandDashboard'; // Import the new component
import './App.css';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
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
                                <Navigate to="/overview" /> 
                            ) : (
                                <LoginPage setIsAuthenticated={setIsAuthenticated} />
                            )
                        }
                    />
                    <Route
                        path="/signup"
                        element={
                            isAuthenticated ? (
                                <Navigate to="/overview" />
                            ) : (
                                <SignUpPage />
                            )
                        }
                    />
                    <Route
                        path="/brand-settings"
                        element={
                            isAuthenticated ? (
                                <BrandSettings />
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    <Route
                        path="/influencer-settings"
                        element={
                            isAuthenticated ? (
                                <InfluencerSettings />
                            ) : (
                                <Navigate to="/login" />
                            )
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
                            isAuthenticated ? (
                                <OverviewPage /> 
                            ) : (
                                <Navigate to="/login" />
                            )
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
                                <Campaign /> // Make sure this matches your Campaign component import
                            ) : (
                                <Navigate to="/" /> // Redirects to the homepage if not authenticated
                            )
                        }
                    />
                    <Route
                        path="/influencer-brand-dashboard"
                        element={
                            isAuthenticated ? (
                                <InfluencerBrandDashboard /> // New route for InfluencerBrandDashboard
                            ) : (
                                <Navigate to="/login" /> // Redirects to the login page if not authenticated
                            )
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
