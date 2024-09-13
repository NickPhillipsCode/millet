import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaHome, FaBriefcase, FaUsers, FaCog, FaUserCircle, FaStore, FaTag, FaInfoCircle, FaSignOutAlt } from 'react-icons/fa'; // Updated to include necessary icons
import './Profile.css';

const ProfilePage = ({ onLogout }) => {
    const [email, setEmail] = useState('');
    const [userType, setUserType] = useState(''); // Store user type
    const [companyName, setCompanyName] = useState(''); // Store company name
    const [showDropdown, setShowDropdown] = useState(false); // State to toggle dropdown visibility
    const navigate = useNavigate();
    const location = useLocation(); // Get the current route

    useEffect(() => {
        const token = localStorage.getItem('token');
        
        if (token) {
            const payload = JSON.parse(atob(token.split('.')[1]));
            console.log('Token payload:', payload); // Log the entire payload for debugging
            setEmail(payload.email);
            setUserType(payload.user_type); // Assuming user_type is in the token payload
            if (payload.user_type === 'brand') {
                setCompanyName(payload.company_name || 'Test Company'); // Log company name or a fallback
                console.log('Company Name:', payload.company_name); // Log the company name
            }
        } else {
            setEmail('No user logged in.');
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        if (onLogout) {
            onLogout();
        }
        navigate('/');
    };

    // Function to check if the link is active
    const isActive = (path) => location.pathname === path ? 'active' : '';

    // Function to toggle the dropdown menu
    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <div className="profile-container">
            <div className="sidebar">
                {userType === 'brand' && (
                    <div className="company-name">
                        <h3>{companyName}</h3>
                    </div>
                )}
                <ul>
                    <li><a href="/overview" className={isActive('/overview')}><FaHome /><span>Overview</span></a></li>
                    <li><a href="/campaigns" className={isActive('/campaigns')}><FaBriefcase /><span>Campaigns</span></a></li>
                    <li><a href="/influencers" className={isActive('/influencers')}><FaUsers /><span>Influencers</span></a></li>
                    <li><a href="/settings" className={isActive('/settings')}><FaCog /><span>Settings</span></a></li>
                </ul>
            </div>
    
            <div className="main-content">
                {/* Profile icon in the top-right corner */}
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
    
                <h2>Your Profile</h2>
                <div className="profile-details">
                    <div className="profile-card">
                        <h3>Email</h3>
                        <p>{email}</p>
                    </div>
    
                    <div className="profile-card">
                        <h3>Other Info</h3>
                        <p>Details coming soon...</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
