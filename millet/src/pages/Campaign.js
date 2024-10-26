import React, { useEffect, useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import NewCampaignPopUp from '../components/NewCampaignPopUp';
import './Campaign.css';

import { useLocation } from 'react-router-dom';

const CampaignPage = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [companyName, setCompanyName] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const location = useLocation(); // To detect when the route changes

    const fetchCampaigns = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            const payload = JSON.parse(atob(token.split('.')[1]));
            setCompanyName(payload.company_name || 'Test Company');
    
            try {
                const response = await fetch('http://localhost:5000/api/campaigns', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
    
                if (response.ok) {
                    const data = await response.json();
                    setCampaigns(data);
                } else {
                    // Log response text to understand the issue
                    const errorText = await response.text();
                    console.error('Failed to fetch campaigns:', response.status, errorText);
                }
            } catch (error) {
                console.error('Error fetching campaigns:', error);
            }
        }
    };
    
    // Fetch campaigns when the component mounts or when the location changes
    useEffect(() => {
        fetchCampaigns();
    }, [location, isModalOpen]); // Add location and isModalOpen as dependencies to refetch campaigns when navigating or closing the modal

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredCampaigns = campaigns.filter((campaign) =>
        campaign.product_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const addNewCampaign = (newCampaign) => {
        setCampaigns((prevCampaigns) => [...prevCampaigns, newCampaign]);
    };

    return (
        <div className="campaign-container">
            <Sidebar companyName={companyName} />
            <div className="main-content">
                <Navbar />
                <div className="campaign-content">
                    <div className="campaign-header-container">
                        <div className="campaign-header">
                            <h1>Campaigns</h1>
                            <p>Here are your current campaigns</p>
                        </div>
                        <button className="new-campaign-button" onClick={() => setIsModalOpen(true)}>
                            <FaPlusCircle /> New Campaign
                        </button>
                    </div>

                    <div className="campaign-search">
                        <input
                            type="text"
                            placeholder="Search for a campaign by product name"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <button className="search-button">Search</button>
                    </div>

                    <div className="campaign-results">
                        <p>{filteredCampaigns.length} results</p>
                        <div className="campaign-table">
                        <div className="campaign-table-header">
    <div className="table-cell">Product name</div>
    <div className="table-cell">Product image</div>
    <div className="table-cell">Category</div>
    <div className="table-cell">Price</div>
    <div className="table-cell">Interested</div>
    <div className="table-cell">Start Date</div> {/* Replaced Start Date with Created At */}
</div>
<div className="campaign-table-body">
    {filteredCampaigns.length > 0 ? (
        filteredCampaigns.map((campaign, index) => (
            <div className="campaign-table-row" key={index}>
                <div className="table-cell">{campaign.product_name}</div>
                <div className="table-cell">
                    {campaign.product_image ? (
                        <img
                            src={campaign.product_image}
                            alt={campaign.product_name}
                            className="product-image"
                        />
                    ) : (
                        'N/A'
                    )}
                </div>
                <div className="table-cell">{campaign.category}</div>
                <div className="table-cell">{campaign.price}</div>
                <div className="table-cell">{campaign.interested}</div>
                <div className="table-cell">
                    {new Date(campaign.created_at).toLocaleDateString()} {/* Display Created At */}
                </div>
            </div>
        ))
    ) : (
        <div className="no-results-container">
            <p className="no-results">No results found</p>
        </div>
    )}
</div>

                        </div>
                    </div>
                </div>
            </div>

            {/* Pass addNewCampaign function to NewCampaignPopUp */}
            <NewCampaignPopUp isOpen={isModalOpen} onClose={handleModalClose} addNewCampaign={addNewCampaign} />
        </div>
    );
};

export default CampaignPage;
