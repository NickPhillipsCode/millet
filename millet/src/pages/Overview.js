import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar'; // Import Navbar component
import './Overview.css'; // Main CSS for the page

const OverviewPage = () => {
    const [campaignData, setCampaignData] = useState({
        totalCampaigns: 0,
        monthlyApplications: 0,
        monthlyInvites: 0,
        availableInvites: 0,
    });

    const [companyName, setCompanyName] = useState(''); // State to store company name

    useEffect(() => {
        // Fetch the company name from the user data (e.g., from localStorage or an API)
        const token = localStorage.getItem('token');
        if (token) {
            const payload = JSON.parse(atob(token.split('.')[1])); // Decode the token
            setCompanyName(payload.company_name || 'Test Company'); // Update with actual company name

            // Fetch brand data using user ID
            fetchBrandData(payload.id);
        }
    }, []);

    // Fetch the brand data for the overview page
    const fetchBrandData = async (userId) => {
        try {
            const token = localStorage.getItem('token');

            // Fetch brand data
            const responseBrand = await fetch(`http://localhost:5000/api/brands/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Include the JWT token for authentication
                }
            });

            if (responseBrand.ok) {
                const dataBrand = await responseBrand.json();

                // Fetch total campaigns count
                const responseCampaigns = await fetch('http://localhost:5000/api/brand/campaigns-count', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}` // Include the JWT token for authentication
                    }
                });

                let totalCampaigns = 0;
                if (responseCampaigns.ok) {
                    const dataCampaigns = await responseCampaigns.json();
                    totalCampaigns = parseInt(dataCampaigns.totalCampaigns, 10);
                } else {
                    console.error('Error fetching campaigns count');
                }

                setCampaignData({
                    totalCampaigns,
                    monthlyApplications: dataBrand.monthly_applications || 0,
                    monthlyInvites: dataBrand.monthly_invites || 0,
                    availableInvites: dataBrand.available_invites,
                });
            } else {
                console.error('Error fetching brand data');
            }
        } catch (error) {
            console.error('Failed to fetch brand data:', error);
        }
    };

    return (
        <div className="overview-container">
            <Sidebar companyName={companyName} />

            <div className="main-content">
                <Navbar />

                <div className="overview-content">
                    <h1>Overview</h1>
                    <p>Here are the latest insights about your campaigns</p>
                    <div className="card-container">
                        <div className="card">
                            <div className="card-header">Total campaigns</div>
                            <div className="card-value">{campaignData.totalCampaigns}</div>
                        </div>
                        <div className="card">
                            <div className="card-header">Monthly applications</div>
                            <div className="card-value">{campaignData.monthlyApplications}</div>
                        </div>
                        <div className="card">
                            <div className="card-header">Monthly invites</div>
                            <div className="card-value">{campaignData.monthlyInvites}</div>
                        </div>
                        <div className="card">
                            <div className="card-header">Available invites</div>
                            <div className="card-value">{campaignData.availableInvites}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OverviewPage;
