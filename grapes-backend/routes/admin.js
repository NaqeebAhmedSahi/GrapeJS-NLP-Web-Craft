import express from 'express';
import Admin from '../models/Admin.js';  // Import the Admin model

const router = express.Router();

// POST request to handle Admin Sign-Up
router.post('/signup', async (req, res) => {
  const { adminName, adminEmail, adminPassword } = req.body;

  try {
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: adminEmail });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists.' });
    }

    // Create a new admin entry with default values for isSuper and response
    const newAdmin = new Admin({
      userName: adminName,
      email: adminEmail,
      password: adminPassword, // You should hash the password here in production
      isSuper: false,
      response: false,
    });

    // Save admin to database
    await newAdmin.save();
    res.status(201).json({ message: 'Admin registration successful. Waiting for approval.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
