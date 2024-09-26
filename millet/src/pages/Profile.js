import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa'; // Only keeping necessary imports
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import './Profile.css';

const ProfilePage = ({ onLogout }) => {
    const [email, setEmail] = useState('');
    const [companyName, setCompanyName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        
        if (token) {
            const payload = JSON.parse(atob(token.split('.')[1]));
            setEmail(payload.email);
            if (payload.user_type === 'brand') {
                setCompanyName(payload.company_name || 'Test Company');
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

    return (
        <div className="profile-container">
            <Sidebar companyName={companyName} />
            <div className="main-content">
                <Navbar /> {/* Navbar component */}

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
