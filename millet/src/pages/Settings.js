import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import './Settings.css'; // Main CSS for the settings page

const SettingsPage = () => {
    const [brandDetails, setBrandDetails] = useState({
        firstName: '',
        lastName: '',
        about: '',
        companyName: '',
        companyDescription: ''
    });

    const [isEditingPersonal, setIsEditingPersonal] = useState(false); // State for personal details edit mode
    const [isEditingCompany, setIsEditingCompany] = useState(false);  // State for company details edit mode

    useEffect(() => {
        // Fetch user data (first name, last name, about, company name, company description)
        const fetchBrandData = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await fetch('http://localhost:5000/api/user/brand', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setBrandDetails({
                        firstName: data.first_name || '',
                        lastName: data.last_name || '',
                        about: data.about || '',
                        companyName: data.company_name || '',
                        companyDescription: data.company_description || '',
                    });
                } else {
                    console.error('Error fetching user data');
                }
            }
        };

        fetchBrandData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBrandDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const toggleEditPersonal = async () => {
        if (isEditingPersonal) {
            // Save changes when switching from Edit to Save
            const token = localStorage.getItem('token');
            try {
                const response = await fetch('http://localhost:5000/brand-settings', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        firstName: brandDetails.firstName,
                        lastName: brandDetails.lastName,
                        about: brandDetails.about,
                        companyName: brandDetails.companyName, // Include all fields
                        companyDescription: brandDetails.companyDescription,
                    }),
                });
    
                if (response.ok) {
                    console.log('Settings updated successfully');
                } else {
                    console.error('Failed to update settings');
                }
            } catch (error) {
                console.error('Error updating settings:', error);
            }
        }
        setIsEditingPersonal(!isEditingPersonal); // Toggle personal details edit mode
    };
    
    const toggleEditCompany = async () => {
        if (isEditingCompany) {
            // Save changes when switching from Edit to Save
            const token = localStorage.getItem('token');
            try {
                const response = await fetch('http://localhost:5000/brand-settings', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        firstName: brandDetails.firstName, // Include all fields
                        lastName: brandDetails.lastName,
                        about: brandDetails.about,
                        companyName: brandDetails.companyName,
                        companyDescription: brandDetails.companyDescription,
                    }),
                });
    
                if (response.ok) {
                    console.log('Company details updated successfully');
                } else {
                    console.error('Failed to update company details');
                }
            } catch (error) {
                console.error('Error updating company details:', error);
            }
        }
        setIsEditingCompany(!isEditingCompany); // Toggle company details edit mode
    };
    

    return (
        <div className="settings-wrapper">
            <Sidebar companyName={brandDetails.companyName} />
            <div className="main-content">
                <Navbar />
                <div className="settings-content">
                    <h1>Settings</h1>
                    <p>Here are your personal and company details</p>

                    <div className="cards-container">
                        {/* Personal Details Card */}
                        <div className="card">
                            <h2>Personal Details</h2>
                            <p>Complete these questions to connect with influencers and build campaigns</p>
                            <div className="input-group">
                                <label htmlFor="firstName">First Name</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={brandDetails.firstName}
                                    onChange={handleInputChange}
                                    placeholder="First name"
                                    disabled={!isEditingPersonal}
                                />
                            </div>
                            <div className="input-group">
                                <label htmlFor="lastName">Last Name</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={brandDetails.lastName}
                                    onChange={handleInputChange}
                                    placeholder="Last name"
                                    disabled={!isEditingPersonal}
                                />
                            </div>
                            <div className="input-group">
                                <label htmlFor="about">About</label>
                                <textarea
                                    id="about"
                                    name="about"
                                    value={brandDetails.about}
                                    onChange={handleInputChange}
                                    placeholder="Introduce yourself to influencers"
                                    disabled={!isEditingPersonal}
                                />
                            </div>
                            <button onClick={toggleEditPersonal} className="edit-btn">
                                {isEditingPersonal ? 'Save' : 'Edit'}
                            </button>
                        </div>

                        {/* Company Details Card */}
                        <div className="card">
                            <h2>Company Details</h2>
                            <p>Describe what your company does and your ideal influencer persona</p>
                            <div className="input-group">
    <label htmlFor="companyName">Company Name</label>
    <input
        type="text"
        id="companyName"
        name="companyName"
        value={brandDetails.companyName}
        onChange={handleInputChange}
        placeholder="Company Name"
        disabled={!isEditingCompany} // Enable/disable based on edit mode
    />
</div>

                            <div className="input-group">
                                <label htmlFor="companyDescription">Description</label>
                                <textarea
                                    id="companyDescription"
                                    name="companyDescription"
                                    value={brandDetails.companyDescription}
                                    onChange={handleInputChange}
                                    placeholder="Introduce your company to influencers"
                                    disabled={!isEditingCompany}
                                />
                            </div>
                            <button onClick={toggleEditCompany} className="edit-btn">
                                {isEditingCompany ? 'Save' : 'Edit'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
