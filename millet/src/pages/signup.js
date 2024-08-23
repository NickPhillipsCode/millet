import React, { useEffect } from 'react';
import './signup.css';

const SignUpPage = () => {
        useEffect(() => {
            document.title = "Sign Up | millet";
        }, []);
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
                    <button className="brand-btn">I'm a brand</button>
                    <button className="influencer-btn">I'm an influencer</button>
                </div>
                <form>
                    <input type="email" placeholder="Enter your email" required />
                    <input type="password" placeholder="Enter your password" required />
                    <div className="terms">
                        <input type="checkbox" required />
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
