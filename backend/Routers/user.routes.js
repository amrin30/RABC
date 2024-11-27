const express = require('express');
const router = express.Router();
const {
  Register,
  Login,
  AddUser,
  GetUser,
  GetOneUser,
  EditUser,
  DeleteUser,
  GetAdminProfile,
  GetUserStats
} = require('../controllers/user.controller'); // Path to your controller

// Routes
router.post('/register', Register);
router.post('/login', Login);
router.post('/add', AddUser);
router.get('/', GetUser); // Fetch all users
router.get('/:id', GetOneUser); // Fetch single user by ID
router.put('/:id', EditUser); // Update user by ID
router.delete('/:id', DeleteUser); // Delete user by ID
router.get('/admin/profile', GetAdminProfile); // Get the admin profile
router.get('/admin/stats', GetUserStats); // Add this route for fetching stats
module.exports = router; 