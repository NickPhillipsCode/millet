import React, { useState } from 'react';
import { FaUserCircle, FaHome, FaStore, FaTag, FaInfoCircle, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const [dropdownVisible, setDropdownVisible] = useState(false);

    // Function to toggle dropdown visibility
    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    // Function to handle navigation
    const handleNavigate = (path) => {
        navigate(path);
        setDropdownVisible(false); // Close dropdown after navigating
    };

    // Function to handle logout
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
        window.location.reload();
    };

    return (
        <div className="navbar">
            <div className="navbar-content">
                <div className="navbar-profile">
                    <FaUserCircle className="profile-icon" onClick={toggleDropdown} />
                    {dropdownVisible && (
                        <div className="dropdown-menu">
                            <ul>
                                <li onClick={() => handleNavigate('/overview')}>
                                    <FaHome /> Dashboard
                                </li>
                                <li onClick={() => handleNavigate('/marketplace')}>
                                    <FaStore /> Marketplace
                                </li>
                                <li onClick={() => handleNavigate('/pricing')}>
                                    <FaTag /> Pricing
                                </li>
                                <li onClick={() => handleNavigate('/about')}>
                                    <FaInfoCircle /> About us
                                </li>
                            </ul>
                            <button onClick={handleLogout} className="logout-button">
                                <FaSignOutAlt /> Log out
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Navbar;
