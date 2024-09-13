import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../assets/images/millet_logo.png'; // Import the logo image

const Header = ({ isAuthenticated }) => {
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
                    <li><a href="#about">About</a></li>
                </ul>
            </nav>
            <div className="auth-buttons">
                {isAuthenticated ? (
                    <div className="profile-icon">
                        <Link to="/profile">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512"
                                className="profile-icon-svg"
                            >
                                <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"/>
                            </svg>
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
        </header>
    );
};

export default Header;
