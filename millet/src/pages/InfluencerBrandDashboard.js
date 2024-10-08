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

    // Function to determine the number of results based on the tab
    const getResultsCount = () => {
        return tab === 'applications' ? applications.length : invites.length;
    };

    return (
        <div className="overview-container">
            <Sidebar companyName={companyName} />

            <div className="main-content">
                <Navbar />
                
                <div className="overview-content">
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

                    {/* Display the number of results under the buttons */}
                    <div className="results-count">
                        {getResultsCount()} results
                    </div>

                    <div className="tab-content">
                        {tab === 'applications' ? (
                            applications.length > 0 ? (
                                <div className="results">
                                    {/* Display applications here */}
                                </div>
                            ) : (
                                <div className="no-results">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="40"
                                        height="40"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 12c2.205 0 4-1.795 4-4s-1.795-4-4-4-4 1.795-4 4 1.795 4 4 4zm0 2c-2.672 0-8 1.337-8 4v2h16v-2c0-2.663-5.328-4-8-4z" />
                                    </svg>
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
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="40"
                                        height="40"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M20 8h-16v10h16v-10zm0-2v-3h-16v3h-4v14h24v-14h-4zm-4 5h-8v-1h8v1z" />
                                    </svg>
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
