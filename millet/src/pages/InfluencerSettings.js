import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './InfluencerSettings.css';

const InfluencerSettings = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        tiktokHandle: '',
        about: '',
        campaignTypes: '',
        campaignCategories: '',
    });

    const [videoFile, setVideoFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleCheckboxChange = (e) => {
        const { name, value, checked } = e.target;
        const currentValues = formData[name] ? formData[name].split(', ') : [];

        if (checked) {
            currentValues.push(value);
        } else {
            const index = currentValues.indexOf(value);
            if (index > -1) {
                currentValues.splice(index, 1);
            }
        }

        setFormData({
            ...formData,
            [name]: currentValues.join(', '),
        });
    };

    const handleVideoUpload = (e) => {
        setVideoFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.firstName || !formData.lastName || !formData.tiktokHandle || !formData.about || !formData.campaignTypes || !formData.campaignCategories) {
            alert('Please fill in all required fields.');
            return;
        }

        try {
            setLoading(true);

            const token = localStorage.getItem('token');
            if (!token) {
                alert('You must be logged in to save your settings.');
                return;
            }

            const formDataObject = new FormData();
            formDataObject.append('firstName', formData.firstName);
            formDataObject.append('lastName', formData.lastName);
            formDataObject.append('tiktokHandle', formData.tiktokHandle);
            formDataObject.append('about', formData.about);
            formDataObject.append('campaignTypes', formData.campaignTypes);
            formDataObject.append('campaignCategories', formData.campaignCategories);
            if (videoFile) {
                formDataObject.append('introVideo', videoFile);
            }

            const response = await fetch('http://localhost:5000/influencer-settings', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formDataObject,
            });

            if (response.ok) {
                alert('Profile saved successfully!');
                navigate('/InfluencerDashboard/Account');
            } else {
                const errorData = await response.json();
                console.error('Server Error:', errorData);
                alert(`Failed to save settings. Error: ${errorData.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert(`Failed to save settings. Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const isFormValid = () => {
        return formData.firstName && formData.lastName && formData.tiktokHandle && formData.about && formData.campaignTypes && formData.campaignCategories;
    };

    return (
        <div className="influencer-settings-container">
            <form className="settings-form" onSubmit={handleSubmit}>
                <div className="details-section">
                    <h3>Personal details</h3>
                    <p>Complete these questions to connect with brands for collaborations</p>
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First name"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last name"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="tiktokHandle"
                        placeholder="TikTok handle"
                        value={formData.tiktokHandle}
                        onChange={handleChange}
                        required
                    />
                    <textarea
                        name="about"
                        placeholder="Introduce yourself to candidates"
                        value={formData.about}
                        onChange={handleChange}
                        required
                    />
                    <div className="video-upload-section">
                        <label htmlFor="introVideo">Upload an intro video</label>
                        <input
                            type="file"
                            name="introVideo"
                            id="introVideo"
                            accept="video/*"
                            onChange={handleVideoUpload}
                        />
                    </div>
                </div>

                <div className="details-section">
    <h3>Interests</h3>
    <p>Select the campaign types and categories that you are interested in for collaborations</p>
    <div className="checkbox-section">
        <label>Campaign types</label>
        <div>
            <label>
                <input
                    type="checkbox"
                    name="campaignTypes"
                    value="Livestream"
                    onChange={handleCheckboxChange}
                />
                Livestream
            </label>
            <label>
                <input
                    type="checkbox"
                    name="campaignTypes"
                    value="Short video"
                    onChange={handleCheckboxChange}
                />
                Short video
            </label>
        </div>
    </div>
    <div className="checkbox-section">
        <label>Campaign categories</label>
        <div>
            <label>
                <input
                    type="checkbox"
                    name="campaignCategories"
                    value="Fashion"
                    onChange={handleCheckboxChange}
                />
                Fashion
            </label>
            <label>
                <input
                    type="checkbox"
                    name="campaignCategories"
                    value="Beauty"
                    onChange={handleCheckboxChange}
                />
                Beauty
            </label>
            <label>
                <input
                    type="checkbox"
                    name="campaignCategories"
                    value="Clothing"
                    onChange={handleCheckboxChange}
                />
                Clothing
            </label>
            <label>
                <input
                    type="checkbox"
                    name="campaignCategories"
                    value="Hairstyling"
                    onChange={handleCheckboxChange}
                />
                Hairstyling
            </label>
            <label>
                <input
                    type="checkbox"
                    name="campaignCategories"
                    value="Babycare"
                    onChange={handleCheckboxChange}
                />
                Babycare
            </label>
            <label>
                <input
                    type="checkbox"
                    name="campaignCategories"
                    value="Food"
                    onChange={handleCheckboxChange}
                />
                Food
            </label>
            <label>
                <input
                    type="checkbox"
                    name="campaignCategories"
                    value="Outdoors"
                    onChange={handleCheckboxChange}
                />
                Outdoors
            </label>
            <label>
                <input
                    type="checkbox"
                    name="campaignCategories"
                    value="Skincare"
                    onChange={handleCheckboxChange}
                />
                Skincare
            </label>
            <label>
                <input
                    type="checkbox"
                    name="campaignCategories"
                    value="Travel"
                    onChange={handleCheckboxChange}
                />
                Travel
            </label>
            <label>
                <input
                    type="checkbox"
                    name="campaignCategories"
                    value="Lifestyle"
                    onChange={handleCheckboxChange}
                />
                Lifestyle
            </label>
        </div>
    </div>
</div>


                <div className="save-button-container">
                    <button type="submit" className="save-button" disabled={loading || !isFormValid()}>
                        {loading ? 'Saving...' : 'Complete Profile'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default InfluencerSettings;
