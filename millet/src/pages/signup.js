import React, { useState, useEffect } from 'react';
import './signup.css';

const SignUpPage = () => {
    const [userType, setUserType] = useState(null);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        agreedToTerms: false,
    });

    useEffect(() => {
        document.title = "Sign Up | millet";
    }, []);

    const handleUserTypeSelection = (type) => {
        console.log(`User type selected: ${type}`);
        setUserType(type);
    };

    const handleChange = (e) => {
        const { name, value, type: inputType, checked } = e.target;
        setFormData({
            ...formData,
            [name]: inputType === 'checkbox' ? checked : value,
        });
        console.log(`Form data updated: ${name} = ${inputType === 'checkbox' ? checked : value}`);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!userType) {
            alert("Please select if you're a brand or influencer.");
            return;
        }

        console.log('Submitting form data:', { ...formData, userType });
    
        try {
            const response = await fetch('http://localhost:5000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...formData, userType }),
            });

            console.log('Server response:', response);
    
            if (response.ok) {
                alert('Sign up successful!');
                // Redirect or clear form as needed
            } else {
                const errorData = await response.json();
                console.error('Error response data:', errorData);
                alert(`Sign up failed. Error: ${errorData.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Error during fetch:', error);
            alert(`Sign up failed. Error: ${error.message}`);
        }
    };
    
    return (
        <div className="signup-container">
            <div className="signup-left">
                <h1>Millet</h1>
                <p>Join America's largest influencer marketplace for live shopping.</p>
            </div>
            <div className="signup-right">
                <h2>Create an account</h2>
                <p>Select brand or influencer and set up your profile in the next step</p>
                <div className="signup-buttons">
                    <button
                        type="button"
                        className={`brand-btn ${userType === 'brand' ? 'selected' : ''}`}
                        onClick={() => handleUserTypeSelection('brand')}
                    >
                        I'm a brand
                    </button>
                    <button
                        type="button"
                        className={`influencer-btn ${userType === 'influencer' ? 'selected' : ''}`}
                        onClick={() => handleUserTypeSelection('influencer')}
                    >
                        I'm an influencer
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <div className="terms">
                        <input
                            type="checkbox"
                            name="agreedToTerms"
                            checked={formData.agreedToTerms}
                            onChange={handleChange}
                            required
                        />
                        <label>I agree to the terms & conditions</label>
                    </div>
                    <button type="submit" className="signup-submit">Sign up</button>
                </form>
                <p>Already have an account? <a href="/login">Log in</a></p>
            </div>
        </div>
    );
};

export default SignUpPage;
