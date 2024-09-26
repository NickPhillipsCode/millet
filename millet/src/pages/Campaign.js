import React, { useEffect, useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import './Campaign.css'; // Main CSS for the page

const CampaignPage = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [companyName, setCompanyName] = useState(''); // State to store company name
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // Fetch the company name from the user data (e.g., from localStorage or an API)
        const token = localStorage.getItem('token');
        if (token) {
            const payload = JSON.parse(atob(token.split('.')[1])); // Decode the token
            setCompanyName(payload.company_name || 'Test Company'); // Update with actual company name
        }

        // Fetch campaigns data from your API (Replace this with your actual API request)
        setCampaigns([
            {
                productName: 'Test - Nick Campaign',
                productImage: '',
                category: 'Beauty',
                price: '$5',
                interested: 12,
                startDate: 'Sep 22, 2024'
            }
        ]);
    }, []);

    // Function to handle search input change
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // Function to filter campaigns based on search term
    const filteredCampaigns = campaigns.filter(campaign =>
        campaign.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="campaign-container">
            {/* Sidebar Component */}
            <Sidebar companyName={companyName} />

            {/* Main Content */}
            <div className="main-content">
                {/* Include Navbar Component */}
                <Navbar />

                {/* Campaign Content */}
                <div className="campaign-content">
                    {/* Campaign Header */}
                    <div className="campaign-header-container">
                        <div className="campaign-header">
                            <h1>Campaigns</h1>
                            <p>Here are your current campaigns</p>
                        </div>
                        <button className="new-campaign-button">
                            <FaPlusCircle /> New Campaign
                        </button>
                    </div>

                    {/* Search Bar */}
                    <div className="campaign-search">
                        <input
                            type="text"
                            placeholder="Search for a campaign"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <button className="search-button">Search</button>
                    </div>

                    {/* Campaign Results */}
                    <div className="campaign-results">
                        <p>{filteredCampaigns.length} results</p>
                        <div className="campaign-table">
                            <div className="campaign-table-header">
                                <div className="table-cell">Product name</div>
                                <div className="table-cell">Product image</div>
                                <div className="table-cell">Category</div>
                                <div className="table-cell">Price</div>
                                <div className="table-cell">Interested</div>
                                <div className="table-cell">Start date</div>
                            </div>
                            <div className="campaign-table-body">
                                {filteredCampaigns.length > 0 ? (
                                    filteredCampaigns.map((campaign, index) => (
                                        <div className="campaign-table-row" key={index}>
                                            <div className="table-cell">{campaign.productName}</div>
                                            <div className="table-cell">
                                                {campaign.productImage ? (
                                                    <img
                                                        src={campaign.productImage}
                                                        alt={campaign.productName}
                                                        className="product-image"
                                                    />
                                                ) : (
                                                    'N/A'
                                                )}
                                            </div>
                                            <div className="table-cell">{campaign.category}</div>
                                            <div className="table-cell">{campaign.price}</div>
                                            <div className="table-cell">{campaign.interested}</div>
                                            <div className="table-cell">{campaign.startDate}</div>
                                        </div>
                                    ))
                                ) : (
                                    // Empty div to fill space when there are no campaigns
                                    <div className="no-results-container">
                                        <p className="no-results">No results found</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CampaignPage;
