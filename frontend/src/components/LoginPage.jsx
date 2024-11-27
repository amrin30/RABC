import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import styles from './LoginPage.module.css';

// Navbar Component (Same as before)
const Navbar = ({ onLogout }) => (
  <div className={styles.navbar}>
    <div className={styles.navLeft}>
      <h2>Login</h2>
    </div>
    <div className={styles.navRight}>
      <Link to="/" className={styles.navLink}>Home</Link>
      <button className={styles.navLink} onClick={onLogout}>Logout</button>
    </div>
  </div>
);

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false); // For handling logout confirmation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/api/user/login', formData);

      if (response.data.error === false) {
        setIsSuccess(true);
      } else {
        setErrorMessage(response.data.message || 'Invalid email or password.');
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || 'Something went wrong. Please try again.'
      );
    }
  };

  const handleLogout = () => {
    setShowLogoutConfirmation(true); // Show the logout confirmation message
  };

  const confirmLogout = () => {
    // Redirect to the login page after confirming logout
    setShowLogoutConfirmation(false);
    navigate('/login');
  };

  const cancelLogout = () => {
    setShowLogoutConfirmation(false); // Close the confirmation message without logging out
  };

  return (
    <div className={styles.pageContainer}>
      <Navbar onLogout={handleLogout} /> {/* Pass logout handler to Navbar */}

      {/* Main Content Area */}
      <div className={styles.container}>
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        
        {/* Login Form */}
        {!isSuccess && !showLogoutConfirmation && (
          <form onSubmit={handleSubmit} className={styles.form}>
            <h2 className={styles.title}>Login</h2>

            <label className={styles.label}>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </label>
            <label className={styles.label}>
              Password:
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </label>
            <button type="submit" className={styles.button}>Login</button>
          </form>
        )}

        {/* Login Success */}
        {isSuccess && (
          <div className={styles.successMessage}>
            <div className={styles.checkmark}>&#10004;</div>
            <h3>Welcome Back!</h3>
            <p>Login successful! Redirecting to your dashboard.</p>
            <button
              className={styles.button}
              onClick={() => navigate('/dashboard')}
            >
              OK
            </button>
          </div>
        )}

        {/* Logout Confirmation */}
        {showLogoutConfirmation && (
          <div className={styles.successMessage}>
            <div className={styles.checkmark}>&#10006;</div>
            <h3>Are you sure you want to logout?</h3>
            <p>You will be redirected to the login page.</p>
            <div className={styles.popupButtons}>
              <button
                className={styles.button}
                onClick={confirmLogout}
              >
                Yes, Logout
              </button>
              <button
                className={styles.button}
                onClick={cancelLogout}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
