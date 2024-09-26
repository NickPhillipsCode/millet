import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import './InfluencerBrandDashboard.css';

const InfluencerBrandDashboard = () => {
    const [tab, setTab] = useState('applications');
    const [applications, setApplications] = useState([]);
    const [invites, setInvites] = useState([]);
    const [companyName, setCompanyName] = useState('');

    useEffect(() => {
        setApplications([]);
        setInvites([]);

        const token = localStorage.getItem('token');
        if (token) {
            const payload = JSON.parse(atob(token.split('.')[1]));
            setCompanyName(payload.company_name || 'Default Company');
        }
    }, []);

    return (
        <div className="influencer-brand-dashboard-container">
            <Sidebar companyName={companyName} />

            <div className="main-content">
                <Navbar />

                <div className="dashboard-content">
                    <h1>Influencers</h1>
                    <p>Here are the influencer applications and invites</p>

                    <div className="tab-buttons">
                        <button
                            className={`tab-button ${tab === 'applications' ? 'active' : ''}`}
                            onClick={() => setTab('applications')}
                        >
                            Applications
                        </button>
                        <button
                            className={`tab-button ${tab === 'invites' ? 'active' : ''}`}
                            onClick={() => setTab('invites')}
                        >
                            Invites
                        </button>
                    </div>

                    <div className="tab-content">
                        {tab === 'applications' ? (
                            applications.length > 0 ? (
                                <div className="results">
                                    {/* Display applications here */}
                                </div>
                            ) : (
                                <div className="no-results">
                                    <span className="no-results-icon">👥</span>
                                    <p>No influencer applications found.</p>
                                </div>
                            )
                        ) : (
                            invites.length > 0 ? (
                                <div className="results">
                                    {/* Display invites here */}
                                </div>
                            ) : (
                                <div className="no-results">
                                    <span className="no-results-icon">📧</span>
                                    <p>No influencer invites found.</p>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfluencerBrandDashboard;
