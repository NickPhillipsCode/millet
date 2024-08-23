import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="logo">
                <Link to="/" style={{ textDecoration: 'none', color: '#F57EB3' }}>
                    <h2>millet</h2>
                </Link>
            </div>
            <nav>
                <ul>
                    <li><a href="#browse">Browse Influencers</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#blog">Blog</a></li>
                </ul>
            </nav>
            <div className="auth-buttons">
                <button className="login">Log In</button>
                <Link to="/signup">
                    <button className="signup">Sign Up</button>
                </Link>
            </div>
        </header>
    );
};

export default Header;
