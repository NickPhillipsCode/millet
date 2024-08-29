import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import SignUpPage from './pages/signup';
import BrandSettings from './pages/BrandSettings';
import ProfilePage from './pages/Profile';
import './App.css';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

    const handleLogout = () => {
        setIsAuthenticated(false);
    };

    return (
        <Router>
            <div className="App">
                <Header isAuthenticated={isAuthenticated} />
                <Routes>
                    <Route path="/" element={<HeroSection />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/brand-settings" element={<BrandSettings />} />
                    <Route
                        path="/profile"
                        element={<ProfilePage onLogout={handleLogout} />}
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
