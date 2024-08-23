import React from 'react';
import './HeroSection.css'; // For styling

const HeroSection = () => {
    return (
        <section className="hero">

            <h2 className="subheading">LIVE INFLUENCER MARKETPLACE</h2>
            <h1>Take live shopping to<br /> the next level</h1>
            <p>Are you a brand owner or an influencer looking for live collaborations?<br />Sign up to join America’s largest live-focused network.</p>
            <div className="hero-buttons">
                <button className="browse-btn">Browse Influencers</button>
                <button className="get-started-btn">Get Started</button>
            </div>
        </section>
    );
};

export default HeroSection;
