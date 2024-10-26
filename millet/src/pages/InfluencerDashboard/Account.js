import React, { useEffect, useState } from 'react';
import InfluencerSidebar from '../../components/InfluencerSidebar'; // Adjusted path
import Navbar from '../../components/Navbar'; // Corrected path to go two levels up
import './Account.css'; // Main CSS for the page

const InfluencerAccountPage = () => {
    const [accountData, setAccountData] = useState({
        totalApplications: 0,
        acceptedApplications: 0,
        totalInvites: 0,
        acceptedInvites: 0,
    });

    const [influencerName, setInfluencerName] = useState(''); // State to store influencer name

    useEffect(() => {
        // Fetch the influencer name from the user data (e.g., from localStorage or an API)
        const token = localStorage.getItem('token');
        if (token) {
            const payload = JSON.parse(atob(token.split('.')[1])); // Decode the token
            setInfluencerName(payload.name || 'Test Influencer'); // Update with actual influencer name

            // Fetch influencer data using user ID
            fetchInfluencerData(payload.id);
        }
    }, []);

    // Fetch the influencer data for the account page
    const fetchInfluencerData = async (userId) => {
        try {
            const token = localStorage.getItem('token');

            // Fetch influencer data
            const response = await fetch(`http://localhost:5000/api/influencers/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Include the JWT token for authentication
                }
            });

            if (response.ok) {
                const data = await response.json();

                setAccountData({
                    totalApplications: data.total_applications || 0,
                    acceptedApplications: data.accepted_applications || 0,
                    totalInvites: data.total_invites || 0,
                    acceptedInvites: data.accepted_invites || 0,
                });
            } else {
                console.error('Error fetching influencer data');
            }
        } catch (error) {
            console.error('Failed to fetch influencer data:', error);
        }
    };

    return (
        <div className="overview-container">
            <InfluencerSidebar influencerName={influencerName} />

            <div className="main-content">
                <Navbar />

                <div className="overview-content">
                    <h1>Account</h1>
                    <p>Here are the latest insights about your collaborations</p>
                    <div className="card-container">
                        <div className="card">
                            <div className="card-header">Total applications</div>
                            <div className="card-value">{accountData.totalApplications}</div>
                        </div>
                        <div className="card">
                            <div className="card-header">Accepted applications</div>
                            <div className="card-value">{accountData.acceptedApplications}</div>
                        </div>
                        <div className="card">
                            <div className="card-header">Total invites</div>
                            <div className="card-value">{accountData.totalInvites}</div>
                        </div>
                        <div className="card">
                            <div className="card-header">Accepted invites</div>
                            <div className="card-value">{accountData.acceptedInvites}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfluencerAccountPage;
