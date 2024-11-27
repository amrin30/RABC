import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import styles from './RegisterForm.module.css';
const Navbar = () => (
  <div className={styles.navbar}>
    <div className={styles.navLeft}>
      <h2>Register</h2>
    </div>
    <div className={styles.navRight}>
      <Link to="/" className={styles.navLink}>Home</Link>
      <Link to="/login" className={styles.navLink}>Login</Link>
    </div>
  </div>
);
const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    phone: '',
    role: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false); // For controlling the popup

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/api/user/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        gender: formData.gender,
        phone: formData.phone,
        role: formData.role,
      });

      if (response.data.error === false) {
        setIsSuccess(true); // Show success popup
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || 'Something went wrong. Please try again.'
      );
    }
  };

  return (
    <div className={styles.container}>
       <Navbar /> {/* Render Navbar at the top */}

      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.title}>Register</h2>

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
        <label className={styles.label}>
          Confirm Password:
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </label>
        <label className={styles.label}>
          Gender:
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className={styles.select}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </label>
        <label className={styles.label}>
          Phone:
          <input
            type="text"
            name="phone"
            value={formData.phone}
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
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="editor">Editor</option>
          </select>
        </label>
        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.button}>Register</button>
          {/* <button
            type="button"
            onClick={() => navigate('/login')}
            className={`${styles.button} ${styles.secondaryButton}`}
          >
            Login
          </button> */}
        </div>
      </form>

      {isSuccess && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup}>
            <div className={styles.popupHeader}>
              <div className={styles.checkmark}>&#10004;</div>
              <h3>Awesome!</h3>
            </div>
            <p>Your account has been successfully created.</p>
            <button
              className={styles.button}
              onClick={() => {
                setIsSuccess(false);
                navigate('/login');
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterForm;
