import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import SignUpPage from './pages/signup';
import BrandSettings from './pages/BrandSettings';
import ProfilePage from './pages/Profile';
import InfluenceSettings from './pages/InfluenceSettings'; // Import the InfluenceSettings component
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
                {/* Only render Header on routes other than /signup */}
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
                        path="/influence-settings"
                        element={
                            <>
                                <Header isAuthenticated={isAuthenticated} />
                                <InfluenceSettings />
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
