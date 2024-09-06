import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For redirection
import './Login.css';

const LoginPage = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate for redirection

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store the JWT token in localStorage (or sessionStorage)
        localStorage.setItem('token', data.token);
        setIsAuthenticated(true); // Update authentication status

        // Redirect to the profile page
        navigate('/profile');
      } else {
        // Handle login error (invalid credentials)
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred during login. Please try again.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <h1>Millet</h1>
        <p>Welcome back to Millet. Get ready to take live shopping to the next level.</p>
      </div>
      <div className="login-right">
        <h2>Welcome back</h2>
        <p>Please log in below</p>
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Show error if login fails */}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="forgot-password">
            <a href="/forgot-password">Forgot your password?</a>
          </div>
          <button type="submit">Log in</button>
        </form>
        <p className="signup-prompt">
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
