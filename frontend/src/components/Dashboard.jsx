import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './Dashboard.module.css'; // Import CSS module

const Dashboard = () => {
  const [stats, setStats] = useState({ totalUsers: 0, users: 0, editors: 0 });
  const [loading, setLoading] = useState(true);

  // Fetch the statistics when the component mounts
  useEffect(() => {
    axios.get('http://localhost:4000/api/user/admin/stats')
      .then(response => {
        setStats(response.data.data); // Set stats data from the API
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching stats:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
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

      {/* User Stats Cards */}
      <div className={styles.statsContainer}>
        <div className={styles.card}>
          <h3>Total Users</h3>
          <p>{stats.totalUsers}</p>
        </div>
        <div className={styles.card}>
          <h3>Users</h3>
          <p>{stats.users}</p>
        </div>
        <div className={styles.card}>
          <h3>Editors</h3>
          <p>{stats.editors}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
