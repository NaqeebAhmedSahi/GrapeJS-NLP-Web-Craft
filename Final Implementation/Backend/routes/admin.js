import express from 'express';
import Admin from '../models/Admin.js'; // Import the Admin model
import bcrypt from 'bcrypt'; // Import bcrypt for password hashing
import session from 'express-session';
import { JWT_SECRET } from '../config.js';
import User from '../models/User.js';

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

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(adminPassword, 10); // 10 is the salt rounds

    // Create a new admin entry with default values for isSuper and response
    const newAdmin = new Admin({
      userName: adminName,
      email: adminEmail,
      password: hashedPassword, // Save the hashed password
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

// GET request to retrieve pending requests
router.get('/pending-requests', async (req, res) => {
  try {
    // Find all admins where response is false
    const pendingRequests = await Admin.find({ response: false });
    res.status(200).json(pendingRequests);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PATCH request to approve an admin request
router.put('/approve/:id', async (req, res) => {
  const adminId = req.params.id;
  try {
    const updatedAdmin = await Admin.findByIdAndUpdate(
      adminId,
      { response: true },
      { new: true } // Return the updated document
    );

    if (!updatedAdmin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    res.status(200).json({ message: 'Admin approved successfully', updatedAdmin });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE request to delete an admin request
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the admin
    const admin = await Admin.findByIdAndDelete(id);

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found.' });
    }

    res.status(200).json({ message: 'Admin request deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete admin request.' });
  }
});

// POST request to handle Admin Sign-In
router.post('/signin', async (req, res) => {
  const { adminEmail, adminPassword } = req.body;

  try {
      // Find the admin by email
      const admin = await Admin.findOne({ email: adminEmail });
      if (!admin) {
          return res.status(401).json({ message: 'Invalid credentials.' });
      }

      // Compare the provided password with the stored hashed password
      const isMatch = await bcrypt.compare(adminPassword, admin.password);
      if (!isMatch || !admin.response) {
          return res.status(401).json({ message: 'Invalid credentials or not approved.' });
      }

      // Store admin ID in session to maintain login state (if you still want to use session)
      req.session.adminId = admin._id;

      // Send back the adminId to the frontend for local storage
      res.status(200).json({ message: 'Sign-in successful', adminId: admin._id });
  } catch (error) {
      res.status(500).json({ message: 'Server error' });
  }
});


  // GET request to fetch all users
router.get('/users', async (req, res) => {
    try {
      const users = await User.find(); // Fetch all users from the database
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });

  // DELETE request to delete a user
// DELETE request to delete a user by ID
router.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.status(200).json({ message: 'User deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete user.' });
    }
});

  
export default router;
