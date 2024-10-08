import React from 'react';
import { Link } from 'react-router-dom';
import './HeroSection.css';
import heroImage from '../assets/images/millet-hero-3.jpeg'; // Update with your actual image name

const HeroSection = () => {
    return (
        <section className="hero" style={{ backgroundImage: `url(${heroImage})` }}>
            <h1>Take collaborations to <br /> the next level</h1>
            <p>Are you a brand owner or an influencer looking for short video or live collaborations? <br /> Sign up today to join America's most transparent collab <br /> marketplace.</p>
            <div className="hero-buttons">
            <Link to="/signup">
                <button className="get-started-btn">Get Started</button>
            </Link>
            </div>
        </section>
    );
};

export default HeroSection;
