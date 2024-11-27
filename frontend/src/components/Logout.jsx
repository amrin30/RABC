import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Logout.module.css';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add logout logic here, like clearing localStorage or tokens
    navigate('/login');  // Assuming there's a login page
  };

  return (
    <div className={styles.container}>
      <h2>Are you sure you want to logout?</h2>
      <button onClick={handleLogout} className={styles.button}>Logout</button>
    </div>
  );
};

export default Logout;
