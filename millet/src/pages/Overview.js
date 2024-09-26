import React, { useEffect, useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar'; // Import Navbar component
import './Overview.css'; // Main CSS for the page

const OverviewPage = () => {
    const [campaignData, setCampaignData] = useState({
        totalCampaigns: 1,
        monthlyApplications: 0,
        monthlyInvites: 1,
        availableInvites: 9,
    });

    const [companyName, setCompanyName] = useState(''); // State to store company name

    useEffect(() => {
        // Fetch the company name from the user data (e.g., from localStorage or an API)
        const token = localStorage.getItem('token');
        if (token) {
            const payload = JSON.parse(atob(token.split('.')[1])); // Decode the token
            setCompanyName(payload.company_name || 'Test Company'); // Update with actual company name
        }

        // You can replace this static data with a fetch request to your API to get the real campaign data
        setCampaignData({
            totalCampaigns: 1, // Replace with actual data fetching logic
            monthlyApplications: 0,
            monthlyInvites: 1,
            availableInvites: 9,
        });
    }, []);

    return (
        <div className="overview-container">
            {/* Use the Sidebar component and pass the company name as a prop */}
            <Sidebar companyName={companyName} />

            {/* Main Content */}
            <div className="main-content">
                {/* Include Navbar Component */}
                <Navbar />

                {/* Overview Content */}
                <div className="overview-content">
                    <h1>Overview</h1>
                    <p>Here are the latest insights about your campaigns</p>
                    <div className="card-container">
                        {/* Card 1 */}
                        <div className="card">
                            <div className="card-header">Total campaigns</div>
                            <div className="card-value">{campaignData.totalCampaigns}</div>
                        </div>
                        {/* Card 2 */}
                        <div className="card">
                            <div className="card-header">Monthly applications</div>
                            <div className="card-value">{campaignData.monthlyApplications}</div>
                        </div>
                        {/* Card 3 */}
                        <div className="card">
                            <div className="card-header">Monthly invites</div>
                            <div className="card-value">{campaignData.monthlyInvites}</div>
                        </div>
                        {/* Card 4 */}
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
