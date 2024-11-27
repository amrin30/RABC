const UserModel = require("../model/users.model"); // Import the User model
const Joi = require("joi");

// Validation Schema using Joi
const userSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  gender: Joi.string().valid("male", "female", "other").required(),
  password: Joi.string().min(8).required(),
  phone: Joi.string().pattern(/^[0-9]{10}$/).required(),
  role: Joi.string().valid("user", "admin", "editor").required(),
});

// **Register User**
const Register = async (req, res) => {
  try {
    const { name, email, gender, password, phone, role } = req.body;

    // Validate input
    const { error } = userSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: true, message: error.details[0].message });
    }

    // Check if the user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: true, message: "User already exists" });
    }

    // Create the user
    const newUser = await UserModel.create({
      name,
      email,
      gender,
      password,
      phone,
      role,
    });

    res.status(201).json({ error: false, message: "User registered successfully", data: newUser });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};

// **Login User**
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: true, message: "All fields are mandatory" });
    }

    // Check if the user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: true, message: "Invalid email" });
    }

    // Compare passwords directly
    if (user.password !== password) {
      return res.status(400).json({ error: true, message: "Invalid password" });
    }

    res.status(200).json({
      error: false,
      message: "Login successful",
      user: { id: user._id, email: user.email, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};

// **Add User**
const AddUser = async (req, res) => {
  try {
    const { name, email, gender, password, phone, role } = req.body;

    // Validate input
    const { error } = userSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: true, message: error.details[0].message });
    }

    const user = await UserModel.create({
      name,
      email,
      gender,
      password,
      phone,
      role,
    });

    res.status(201).json({ error: false, message: "User added successfully", data: user });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};

// **Get All Users**
const GetUser = async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.status(200).json({ error: false, message: "Users fetched successfully", data: users });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};

// **Get Single User**
const GetOneUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({ error: true, message: "User not found" });
    }
    res.status(200).json({ error: false, message: "User fetched successfully", data: user });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};

// **Edit User**
const EditUser = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const user = await UserModel.findByIdAndUpdate(id, updates, { new: true });
    if (!user) {
      return res.status(404).json({ error: true, message: "User not found" });
    }
    res.status(200).json({ error: false, message: "User updated successfully", data: user });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};

// **Delete User**
const DeleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await UserModel.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ error: true, message: "User not found" });
    }
    res.status(200).json({ error: false, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};

// **Get Admin Profile**
const GetAdminProfile = async (req, res) => {
    try {
      // Assuming admin's role is 'admin' in the 'role' field
      const admin = await UserModel.findOne({ role: "admin" });
  
      if (!admin) {
        return res.status(404).json({ error: true, message: "Admin not found" });
      }
  
      // Return the admin profile data (excluding sensitive data like password)
      const { name, email, phone } = admin;
      res.status(200).json({
        error: false,
        message: "Admin profile fetched successfully",
        data: { name, email, phone }, // Only returning the necessary fields
      });
    } catch (error) {
      res.status(500).json({ error: true, message: error.message });
    }
  };

  // **Get User Statistics**
const GetUserStats = async (req, res) => {
    try {
      const totalUsers = await UserModel.countDocuments({});
      const users = await UserModel.countDocuments({ role: "user" });
      const editors = await UserModel.countDocuments({ role: "editor" });
  
      res.status(200).json({
        error: false,
        message: "User statistics fetched successfully",
        data: {
          totalUsers,
          users,
          editors,
        },
      });
    } catch (error) {
      res.status(500).json({ error: true, message: error.message });
    }
  };
  
  
  module.exports = {
    Register,
    Login,
    AddUser,
    GetUser,
    GetOneUser,
    EditUser,
    DeleteUser,
    GetAdminProfile, // Export the new function
    GetUserStats,
  };
