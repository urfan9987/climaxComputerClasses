const mongoose = require("mongoose");

// Define the schema for Admin
const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
   
  },
  password: {
    type: String,
    required: true,
    
  }
}, {
  timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
});

// Create a model based on the schema

module.exports = mongoose.model("Admin", adminSchema);
