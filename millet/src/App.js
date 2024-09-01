import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import SignUpPage from './pages/signup';
import BrandSettings from './pages/BrandSettings';
import InfluencerSettings from './pages/InfluencerSettings'; // Import the InfluencerSettings component
import ProfilePage from './pages/Profile';
import Footer from './components/Footer';
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
                        path="/signup"
                        element={<SignUpPage />}
                    />
                    <Route
                        path="/brand-settings"
                        element={
                            <>
                                <Header isAuthenticated={isAuthenticated} />
                                <BrandSettings />
                                <Footer />
                            </>
                        }
                    />
                    <Route
                        path="/influencer-settings"
                        element={
                            <>
                                <Header isAuthenticated={isAuthenticated} />
                                <InfluencerSettings /> {/* Render the InfluencerSettings component */}
                                <Footer />
                            </>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <>
                                <Header isAuthenticated={isAuthenticated} />
                                <ProfilePage onLogout={handleLogout} />
                                <Footer />
                            </>
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
