import React, { useState } from 'react';
import { FaHome, FaBriefcase, FaCog, FaUsers, FaBars } from 'react-icons/fa'; // Use relevant icons
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css'; // Reuse existing CSS or create a new one if needed

const InfluencerSidebar = ({ influencerName }) => {
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
                <div className="logo-section">
                    <span>placeholder</span>
                </div>
                <ul>
                    <li>
                        <Link to="/InfluencerDashboard/Account" className={isActive('/InfluencerDashboard/Account')}>
                            <FaHome />
                            <span>Account</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/InfluencerDashboard/collaborations" className={isActive('/InfluencerDashboard/collaborations')}>
                            <FaBriefcase />
                            <span>Collaborations</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/InfluencerDashboard/settings" className={isActive('/InfluencerDashboard/settings')}>
                            <FaCog />
                            <span>Settings</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/InfluencerDashboard/influencers" className={isActive('/InfluencerDashboard/influencers')}>
                            <FaUsers />
                            <span>Influencers</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default InfluencerSidebar;
