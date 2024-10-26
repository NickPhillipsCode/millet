import React from 'react';
import './Footer.css';
import logo from '../assets/images/millet_logo.png'; // Import the logo image
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-logo">
                <img src={logo} alt="millet logo" className="footer-logo-img" /> {/* Add the logo image */}
            </div>
            <div className="footer-links">
                {/* Add the legal and contact links */}
                <Link to="/legal/terms">Legal</Link>
                <a href="#contact">Contact us</a>
                <a 
                    href="https://www.linkedin.com/company/millet-ai/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                >
                    LinkedIn
                </a>
            </div>
            <div className="footer-legal">
                {/* These are the updated links to Privacy and Terms */}
                <Link to="/legal/privacy">Privacy</Link>
                <Link to="/legal/terms">Terms</Link>
            </div>
        </footer>
    );
};

export default Footer;
