import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { FaUserCircle, FaSignOutAlt, FaHome, FaStore, FaTag, FaInfoCircle } from 'react-icons/fa';
import './Settings.css';

const SettingsPage = ({ onLogout }) => {
    const [companyName, setCompanyName] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
            const payload = JSON.parse(atob(token.split('.')[1]));
            if (payload.user_type === 'brand') {
                setCompanyName(payload.company_name || 'Your Company');
            }
        }
    }, []);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove token from local storage
        navigate('/'); // Redirect to the landing page (root URL)
        window.location.reload(); // Refresh the page to update the UI
    };

    return (
        <div className="profile-container">
            <Sidebar companyName={companyName} />

            <div className="main-content">
                {/* Render profile icon only if the user is logged in */}
                {isLoggedIn && (
                    <div className="profile-icon" onClick={toggleDropdown}>
                        <FaUserCircle size={36} />
                        {showDropdown && (
                            <div className="dropdown-menu">
                                <ul>
                                    <li onClick={() => navigate('/dashboard')}>
                                        <FaHome /> Dashboard
                                    </li>
                                    <li onClick={() => navigate('/marketplace')}>
                                        <FaStore /> Marketplace
                                    </li>
                                    <li onClick={() => navigate('/pricing')}>
                                        <FaTag /> Pricing
                                    </li>
                                    <li onClick={() => navigate('/about')}>
                                        <FaInfoCircle /> About us
                                    </li>
                                </ul>
                                <button onClick={handleLogout} className="logout-button">
                                    <FaSignOutAlt /> Log out
                                </button>
                            </div>
                        )}
                    </div>
                )}

                <h2>Settings</h2>
                <p>Here are your personal and company details</p>

                <div className="settings-form">
                    <div className="details-section">
                        <h3>Personal details</h3>
                        <p>Complete these questions to connect with influencers and build campaigns</p>
                        <div className="input-group">
                            <label>First Name</label>
                            <input type="text" name="firstName" placeholder="First name" />
                        </div>
                        <div className="input-group">
                            <label>Last Name</label>
                            <input type="text" name="lastName" placeholder="Last name" />
                        </div>
                        <div className="input-group">
                            <label>About</label>
                            <textarea name="about" placeholder="Introduce yourself to candidates"></textarea>
                        </div>
                    </div>

                    <div className="details-section">
                        <h3>Company details</h3>
                        <p>Describe what your company does and your ideal influencer persona</p>
                        <div className="input-group">
                            <label>Company Name</label>
                            <input type="text" name="companyName" placeholder="Company name" />
                        </div>
                        <div className="input-group">
                            <label>Description</label>
                            <textarea name="companyDescription" placeholder="Introduce your company to candidates"></textarea>
                        </div>
                        <div className="input-group">
                            <label>Target Audience</label>
                            <select name="targetAudience" className="styled-select">
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
                        </div>
                        <div className="input-group">
                            <label>Influencer Categories</label>
                            <select name="influencerCategories" className="styled-select">
                                <option value="">Select Influencer Category</option>
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
                        </div>
                        <div className="input-group">
                            <label>Marketing Budget</label>
                            <input type="text" name="marketingBudget" placeholder="Marketing budget" />
                        </div>
                    </div>
                </div>

                <div className="save-button-container">
                    <button type="submit" className="save-button">Update Settings</button>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
