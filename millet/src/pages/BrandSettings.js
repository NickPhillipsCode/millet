import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BrandSettings.css';

const BrandSettings = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        about: '',
        companyDescription: '',
        targetAudience: '',
        influencerCategories: '',
        marketingBudget: '',
    });
    
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'marketingBudget') {
            const cleanedValue = value.replace(/[^0-9.]/g, '');
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

        // Basic Validation
        if (!formData.firstName || !formData.lastName || !formData.companyDescription || !formData.targetAudience || !formData.influencerCategories || !formData.marketingBudget) {
            alert('Please fill in all required fields.');
            return;
        }

        try {
            setLoading(true); // Set loading state

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
                // Redirect to the Profile page
                navigate('/profile');
            } else {
                const errorData = await response.json();
                alert(`Failed to save settings. Error: ${errorData.message || 'Unknown error'}`);
            }
        } catch (error) {
            alert(`Failed to save settings. Error: ${error.message}`);
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    // Check if all required fields are filled
    const isFormValid = () => {
        return formData.firstName && formData.lastName && formData.companyDescription && formData.targetAudience && formData.influencerCategories && formData.marketingBudget;
    };

    return (
        <div className="settings-container">
            <form className="settings-form" onSubmit={handleSubmit}>
                <div className="details-section">
                    <h3>Personal details</h3>
                    <p>Complete these questions to connect with influencers and build campaigns</p>
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
                    <textarea
                        name="about"
                        placeholder="Introduce yourself to candidates"
                        value={formData.about}
                        onChange={handleChange}
                    />
                </div>
                <div className="details-section">
                    <h3>Company details</h3>
                    <p>Describe what your company does and your ideal influencer persona</p>
                    <div className="upload-section">
                        <div className="upload-photo">Upload <br />logo</div>
                        <button type="button">Change</button>
                    </div>
                    <textarea
                        name="companyDescription"
                        placeholder="Introduce your company to candidates"
                        value={formData.companyDescription}
                        onChange={handleChange}
                        required
                    />
                    <select
                        name="targetAudience"
                        value={formData.targetAudience}
                        onChange={handleChange}
                        required
                        className="styled-select"
                    >
                        <option value="">Select Target Audience</option>
                        <option value="teenagers">Teenagers</option>
                        <option value="young-adults">Young Adults (18-24)</option>
                        <option value="adults">Adults (25-34)</option>
                        <option value="middle-aged">Middle-aged (35-54)</option>
                        <option value="seniors">Seniors (55+)</option>
                        <option value="parents">Parents</option>
                        <option value="professionals">Professionals</option>
                        <option value="students">Students</option>
                    </select>
                    <select
                        name="influencerCategories"
                        value={formData.influencerCategories}
                        onChange={handleChange}
                        required
                        className="styled-select"
                    >
                        <option value="">Select Preferred Influencer Category</option>
                        <option value="fashion">Fashion</option>
                        <option value="beauty">Beauty</option>
                        <option value="fitness">Fitness</option>
                        <option value="food">Food</option>
                        <option value="tech">Tech</option>
                        <option value="gaming">Gaming</option>
                        <option value="travel">Travel</option>
                        <option value="music">Music</option>
                        <option value="lifestyle">Lifestyle</option>
                        <option value="parenting">Parenting</option>
                        <option value="sports">Sports</option>
                        <option value="education">Education</option>
                        <option value="business">Business</option>
                        <option value="entertainment">Entertainment</option>
                        <option value="finance">Finance</option>
                    </select>
                    <input
                        type="text"
                        name="marketingBudget"
                        placeholder="Marketing Budget"
                        value={formData.marketingBudget}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="save-button-container">
                    <button type="submit" className="save-button" disabled={loading || !isFormValid()}>
                        {loading ? 'Saving...' : 'Complete Sign Up'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BrandSettings;
