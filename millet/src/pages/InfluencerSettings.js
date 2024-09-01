import React, { useState } from 'react';
import './InfluencerSettings.css';

const InfluencerSettings = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        tiktokHandle: '',
        about: '',
        campaignTypes: [],
        campaignCategories: [],
        introVideo: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleCheckboxChange = (e) => {
        const { name, value, checked } = e.target;
        const updatedArray = checked
            ? [...formData[name], value]
            : formData[name].filter((item) => item !== value);

        setFormData({
            ...formData,
            [name]: updatedArray,
        });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData({
            ...formData,
            [name]: files[0],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        // Submit the form data to the backend
    };

    return (
        <div className="influencer-settings-container">
            <div className="settings-form">
                <div className="details-section">
                    <h3>Personal details</h3>
                    <p>Complete these questions to connect with brands for collaborations</p>
                    <form onSubmit={handleSubmit}>
                        <div className="upload-section">
                            <div className="upload-photo">Upload photo</div>
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
                        <input
                            type="text"
                            name="tiktokHandle"
                            placeholder="TikTok handle"
                            value={formData.tiktokHandle}
                            onChange={handleChange}
                        />
                        <textarea
                            name="about"
                            placeholder="Introduce yourself to candidates"
                            value={formData.about}
                            onChange={handleChange}
                        />
                        <div className="upload-video-section">
                            <label>Intro video</label>
                            <input
                                type="file"
                                name="introVideo"
                                onChange={handleFileChange}
                            />
                        </div>
                    </form>
                </div>

                <div className="details-section">
                    <h3>Interests</h3>
                    <p>Select the campaign types and categories that you are interested in for collaborations</p>
                    <form>
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
                                        value="Outdoor"
                                        onChange={handleCheckboxChange}
                                    />
                                    Outdoor
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
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div className="settings-form">
                <div className="details-section">
                    <h3>Short video campaign</h3>
                    <p>Choose the fee model and the starting rate for short video campaigns</p>
                    {/* Add fields for fee model and rates */}
                </div>
                <div className="details-section">
                    <h3>Livestream campaign</h3>
                    <p>Choose the fee model and the starting rate for livestream campaigns</p>
                    {/* Add fields for fee model and rates */}
                </div>
            </div>

            <div className="save-button-container">
                <button type="button" className="save-button" onClick={handleSubmit}>
                    Save
                </button>
            </div>
        </div>
    );
};

export default InfluencerSettings;
