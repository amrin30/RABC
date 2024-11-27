import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './AdminProfile.module.css'; // Import the CSS module for styling

const AdminProfile = () => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false); // State to control the popup visibility

  // Fetch admin profile on component mount
  useEffect(() => {
    axios
      .get('http://localhost:4000/api/user/admin/profile')
      .then((response) => {
        setAdmin(response.data.data); // Store the admin data
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching admin profile:', error);
        setLoading(false);
      });
  }, []);

  // Function to handle logout confirmation
  const handleLogout = () => {
    // Show the confirmation popup
    setShowLogoutPopup(true);
  };

  // Function to actually log out the user
  const confirmLogout = () => {
    // Clear session or token (assumes you're using localStorage)
    localStorage.removeItem('authToken');
    // Redirect to login page
    window.location.href = '/login';
  };

  // Function to cancel logout
  const cancelLogout = () => {
    setShowLogoutPopup(false); // Hide the popup if canceled
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!admin) {
    return <div>Admin profile not found.</div>;
  }

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <div className={styles.navbarLeft}>
          <Link to="/dashboard" className={styles.navLinkDashboard}>Dashboard</Link>
        </div>
        <div className={styles.navbarRight}>
          <Link to="/userdetails" className={styles.navLink}>
            User Details
          </Link>
          <Link to="/adminprofile" className={styles.navLink}>
            Admin Profile
          </Link>
          <Link to="/logout" className={styles.navLink}>
            Logout
          </Link>
          
        </div>
      </nav>

      {/* Admin Profile inside Card */}
      <div className={styles.profileContainer}>
        <div className={styles.card}> {/* Card Container */}
          <h2>Admin Profile</h2>
          <div className={styles.profileDetail}>
            <p>
              <strong>Name:</strong> {admin.name}
            </p>
            <p>
              <strong>Email:</strong> {admin.email}
            </p>
            <p>
              <strong>Phone:</strong> {admin.phone}
            </p>
            <button onClick={handleLogout} className={styles.logoutBtn}>
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Popup */}
      {showLogoutPopup && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup}>
            <h3>Are you sure you want to log out?</h3>
            <div className={styles.popupButtons}>
              <button onClick={confirmLogout} className={styles.confirmBtn}>
                Yes
              </button>
              <button onClick={cancelLogout} className={styles.cancelBtn}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProfile;
