const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            match: [/\S+@\S+\.\S+/, "Please provide a valid email address"],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [8, "Password should be at least 8 characters long"],
        },
        phone: {
            type: String,
            required: [true, "Phone number is required"],
            minlength: [10, "Phone number should be exactly 10 digits"],
            maxlength: [10, "Phone number should be exactly 10 digits"],
            unique: true,
        },
        gender: {
            type: String,
            required: [true, "Gender is required"],
            enum: ["male", "female", "other"], // Restrict to specific values
        },
        role: {
            type: String,
            default: "user",
            enum: ["admin", "user", "editor"], // Restrict roles to predefined values
        },
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

module.exports = mongoose.model("UserModel", userSchema);
