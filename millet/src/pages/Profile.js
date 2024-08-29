import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const ProfilePage = ({ onLogout }) => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        
        if (token) {
            // Decode the token to extract user email
            const payload = JSON.parse(atob(token.split('.')[1]));
            setEmail(payload.email);
        } else {
            setEmail('No user logged in.');
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        if (onLogout) {
            onLogout(); // Call the onLogout function passed as a prop to refresh the header
        }
        navigate('/'); // Redirect to the homepage after logout
    };

    return (
        <div className="profile-container">
            <h2>Your Profile</h2>
            <div className="profile-details">
                <p>Email: {email}</p>
            </div>
            {email !== 'No user logged in.' && (
                <button onClick={handleLogout} className="logout-button">
                    Log Out
                </button>
            )}
        </div>
    );
};

export default ProfilePage;
