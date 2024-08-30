import React from 'react';
import './Footer.css';
import logo from '../assets/images/millet_logo.png'; // Import the logo image

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-logo">
                <img src={logo} alt="millet logo" className="footer-logo-img" /> {/* Add the logo image */}
            </div>
            <div className="footer-links">
                <a href="#legal">Legal</a>
                <a href="#contact">Contact us</a>
                <a href="#linkedin">LinkedIn</a>
            </div>
            <div className="footer-legal">
                <a href="#privacy">Privacy</a>
                <a href="#terms">Terms</a>
            </div>
        </footer>
    );
};

export default Footer;
