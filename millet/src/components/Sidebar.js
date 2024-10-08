import React, { useState } from 'react';
import { FaHome, FaBriefcase, FaUsers, FaCog, FaBars } from 'react-icons/fa'; // Import icons
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ companyName }) => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    // Function to toggle sidebar visibility on smaller screens
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    // Function to determine if the current route is active
    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';
    };

    return (
        <>
            {/* Toggle Button */}
            <div className="sidebar-toggle" onClick={toggleSidebar}>
                <FaBars />
            </div>
            {/* Sidebar */}
            <div className={`sidebar ${isOpen ? 'open' : ''}`}>
                {companyName && (
                    <div className="company-name">
                        <h3>{companyName}</h3>
                    </div>
                )}
                <ul>
                    <li>
                        <Link to="/overview" className={isActive('/overview')}>
                            <FaHome />
                            <span>Overview</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/campaigns" className={isActive('/campaigns')}>
                            <FaBriefcase />
                            <span>Campaigns</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/influencer-brand-dashboard" className={isActive('/influencer-brand-dashboard')}>
                            <FaUsers />
                            <span>Influencers</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/settings" className={isActive('/settings')}>
                            <FaCog />
                            <span>Settings</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default Sidebar;
