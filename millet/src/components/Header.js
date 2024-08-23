import React from "react";
import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="logo">
                <h2>millet</h2>
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
                <button className="signup">Sign Up</button>
            </div>
        </header>
    );
};

export default Header;
