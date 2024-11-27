import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './UserForm.module.css';

const UserForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', role: '' });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      // Fetch user details if editing
      // Mock data for now
      setFormData({ name: 'John Doe', email: 'john@example.com', role: 'Admin' });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      // Edit user logic
      console.log('User Updated:', formData);
    } else {
      // Add user logic
      console.log('User Created:', formData);
    }
    navigate('/userdetails');
  };

  return (
    <div className={styles.container}>
      <h2>{id ? 'Edit User' : 'Add New User'}</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </label>
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
          Role:
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className={styles.select}
            required
          >
            <option value="">Select Role</option>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>
        </label>
        <button type="submit" className={styles.button}>Submit</button>
      </form>
    </div>
  );
};

export default UserForm;
