import React from 'react';
import './Marketplace.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const MarketplacePage = () => {
    const isAuthenticated = true;
        return (
        <div className="marketplace-page">
            <Header isAuthenticated={isAuthenticated} />
            <section className="marketplace-content">
                {/* Page-specific Title and Description */}
                <div className="content-header">
    <h2 className="page-title">Check out the most <br /> popular influencers</h2>
    <p className="page-description">
        Connect with influencers for campaign collaborations. Invite influencers for campaigns <br />via one click.
    </p>

                </div>

                {/* Filter Section */}
            </section>
            <Footer />
        </div>
    );
};

export default MarketplacePage;
