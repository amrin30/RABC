import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './UserDetails.module.css'; // Import the CSS module

const UserDetails = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    gender: '',
    password: '',
  });
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showForm, setShowForm] = useState(false); // Toggle form visibility

  // Fetch users from backend
  useEffect(() => {
    axios
      .get('http://localhost:4000/api/user')
      .then((response) => {
        if (!response.data.error) {
          setUsers(response.data.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching users:', err);
        setLoading(false);
      });
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle create user
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/user/add', formData);
      if (response.data.error) {
        alert(response.data.message);
      } else {
        alert('User added successfully!');
        setUsers((prevUsers) => [...prevUsers, response.data.data]);
        setFormData({
          name: '',
          email: '',
          phone: '',
          role: '',
          gender: '',
          password: '',
        });
        setShowForm(false); // Hide the form after user creation
      }
    } catch (error) {
      console.error('Error adding user:', error);
      alert('Error adding user');
    }
  };

  // Handle edit user
  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:4000/api/user/${selectedUserId}`, formData);
      if (response.data.error) {
        alert(response.data.message);
      } else {
        alert('User updated successfully!');
        setUsers((prevUsers) =>
          prevUsers.map((user) => (user._id === selectedUserId ? response.data.data : user))
        );
        setSelectedUserId(null);
        setFormData({
          name: '',
          email: '',
          phone: '',
          role: '',
          gender: '',
          password: '',
        });
        setShowForm(false); // Hide the form after editing
      }
    } catch (error) {
      alert('Error updating user');
    }
  };

  // Handle delete user
  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
      try {
        const response = await axios.delete(`http://localhost:4000/api/user/${userId}`);
        if (!response.data.error) {
          setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
        }
      } catch (error) {
        alert('Error deleting user');
      }
    } else {
      console.log('User deletion cancelled');
    }
  };

  // Handle edit button click
  const handleEditButtonClick = (user) => {
    setSelectedUserId(user._id);
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      gender: user.gender,
      password: '', // Don't pre-fill password for editing
    });
    setShowForm(true); // Show the form automatically when editing
  };

  // Conditionally render the form for create/edit
  const renderForm = () => {
    return (
      <div className={styles.card}>
        <form onSubmit={selectedUserId ? handleEdit : handleCreate} className={styles.userForm}>
          <h3>{selectedUserId ? 'Edit User' : 'Create New User'}</h3>
          <div className={styles.formGroup}>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Phone:</label>
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Role:</label>
            <input
              type="text"
              name="role"
              placeholder="Role"
              value={formData.role}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Gender:</label>
            <select name="gender" value={formData.gender} onChange={handleChange} required>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          {selectedUserId && (
            <div className={styles.formGroup}>
              <label>Password (Leave empty to keep current):</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          )}
          <button type="submit" className={styles.submitButton}>
            {selectedUserId ? 'Update User' : 'Create User'}
          </button>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={() => setShowForm(false)}
          >
            Cancel
          </button>
        </form>
      </div>
    );
  };

  return (
    <div className={styles.dashboardContainer}>
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
          {/* Add User button */}
          <button
            className={styles.addUserButton}
            onClick={() => {
              setSelectedUserId(null); // Ensure no user is selected for editing
              setFormData({
                name: '',
                email: '',
                phone: '',
                role: '',
                gender: '',
                password: '',
              });
              setShowForm(true); // Show the form for adding a new user
            }}
          >
            Add User
          </button>
        </div>
      </nav>

      <div className={styles.mainContent}>
        {/* Conditionally Render Create/Edit User Form on Right Side */}
        {showForm && (
          <div className={styles.formContainer}>
            {renderForm()}
          </div>
        )}

        {/* User List */}
        <div className={styles.userListContainer}>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.role}</td>
                    <td>
                      <button onClick={() => handleEditButtonClick(user)}>Edit</button>
                      <button onClick={() => handleDelete(user._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
