import React from 'react';
import InfluencerSidebar from '../../components/InfluencerSidebar'; // Adjust path as necessary
import Navbar from '../../components/Navbar'; // Adjust path as necessary
import './Settings.css';

const InfluencerSettingsPage = () => {
    return (
        <div className="influencer-settings-page">
            <InfluencerSidebar />
            <div className="main-content">
                <Navbar />
                {/* Add any other content if needed, or leave it blank */}
            </div>
        </div>
    );
};

export default InfluencerSettingsPage;