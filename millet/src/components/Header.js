// src/components/Header.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa'; // Import FaUserCircle from react-icons
import './Header.css';
import logo from '../assets/images/millet_logo.png'; // Import the logo image

const Header = ({ isAuthenticated, showAuthButtons = true }) => {
    const [userType, setUserType] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1])); // Decode the token
                setUserType(payload.user_type); // Set the user type (e.g., 'brand' or 'influencer')
            } catch (error) {
                console.error("Invalid token format:", error);
            }
        }
    }, []);

    return (
        <header className="header">
            <div className="logo">
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <img src={logo} alt="millet logo" className="logo-img" /> {/* Add the logo image */}
                </Link>
            </div>
            <nav>
                <ul>
                    <li><a href="#pricing">Pricing</a></li>
                    <li><a href="#legal">Legal</a></li>
                </ul>
            </nav>
            {showAuthButtons && (
                <div className="auth-buttons">
                    {isAuthenticated ? (
                        <div className="profile-icon">
                            <Link to={userType === 'brand' ? '/overview' : '/InfluencerDashboard/Account'}>
                                <FaUserCircle className="profile-icon-svg" /> {/* Replace SVG with FaUserCircle */}
                            </Link>
                        </div>
                    ) : (
                        <>
                            <Link to="/login">
                                <button className="login">Log In</button>
                            </Link>
                            <Link to="/signup">
                                <button className="signup">Sign Up</button>
                            </Link>
                        </>
                    )}
                </div>
            )}
        </header>
    );
};

export default Header;
