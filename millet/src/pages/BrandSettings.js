// src/pages/BrandSettings.js
import React, { useState } from 'react';
import './BrandSettings.css';

const BrandSettings = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        about: '',
        companyName: '',
        companyDescription: '',
        targetAudience: '',
        influencerCategories: '',
        marketingBudget: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        // If the input field is marketingBudget, remove any non-numeric characters
        if (name === 'marketingBudget') {
            const cleanedValue = value.replace(/[^0-9.]/g, ''); // Remove everything except digits and dots
            setFormData({
                ...formData,
                [name]: cleanedValue,
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('You must be logged in to save your settings.');
                return;
            }
    
            const response = await fetch('http://localhost:5000/brand-settings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });
    
            if (response.ok) {
                alert('Settings saved successfully!');
            } else {
                const errorData = await response.json();
                alert(`Failed to save settings. Error: ${errorData.message || 'Unknown error'}`);
            }
        } catch (error) {
            alert(`Failed to save settings. Error: ${error.message}`);
        }
    };
    

    return (
        <div className="settings-container">
            <h2>Settings</h2>
            <p>Here are your personal and company details</p>
            <div className="settings-form">
                <div className="details-section">
                    <h3>Personal details</h3>
                    <p>Complete these questions to connect with influencers and build campaigns</p>
                    <form onSubmit={handleSubmit}>
                        <div className="upload-section">
                            <div className="upload-photo">Upload photo</div>
                            <button type="button">Change</button>
                        </div>
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First name"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last name"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                        <textarea
                            name="about"
                            placeholder="Introduce yourself to candidates"
                            value={formData.about}
                            onChange={handleChange}
                        />
                        <button type="submit">Save</button>
                    </form>
                </div>
                <div className="details-section">
                    <h3>Company details</h3>
                    <p>Describe what your company does and your ideal influencer persona</p>
                    <form onSubmit={handleSubmit}>
                        <div className="upload-section">
                            <div className="upload-photo">Upload <br />logo</div>
                            <button type="button">Change</button>
                        </div>
                        <input
                            type="text"
                            name="companyName"
                            placeholder="Type your company name"
                            value={formData.companyName}
                            onChange={handleChange}
                        />
                        <textarea
                            name="companyDescription"
                            placeholder="Introduce your company to candidates"
                            value={formData.companyDescription}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="targetAudience"
                            placeholder="Target Audience"
                            value={formData.targetAudience}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="influencerCategories"
                            placeholder="Preferred Influencer Categories"
                            value={formData.influencerCategories}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="marketingBudget"
                            placeholder="Marketing Budget"
                            value={formData.marketingBudget}
                            onChange={handleChange}
                        />
                        <button type="submit">Save</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BrandSettings;
