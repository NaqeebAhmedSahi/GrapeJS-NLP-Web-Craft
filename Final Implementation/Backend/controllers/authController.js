import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import nodemailer from 'nodemailer';
import { JWT_SECRET } from '../config.js';

 // Hardcoded for example

export const signUp = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

    // Store the user ID in the session
    req.session.userId = user._id; // If you're using express-session

    res.json({
      message: 'Login successful',
      token,
      userId: user._id // Optionally send the user ID back
    });
  } catch (error) {
    console.error('Error signing in:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const forgotPassword = async (req, res) => {
    const { email } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Create a token for the password reset
      const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '15m' });
  
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'naqeebahmedsahi@gmail.com', // Replace with your email
          pass: 'qgpa ogcx yccg bycm' // Use an app password or the user's password
        }
      });
  
      const mailOptions = {
        from: 'naqeebahmedsahi@gmail.com',
        to: user.email,
        subject: 'Password Reset',
        text: `You requested a password reset. Click the link below to reset your password:\n\nhttp://localhost:3000/reset-password/${token}`
      };
  
      await transporter.sendMail(mailOptions);
      res.json({ message: 'Password reset link sent to your email' });
    } catch (error) {
      console.error('Error in forgot password:', error); // Log the error
      res.status(500).json({ message: error.message || 'Server error' });
    }
  };
  

// New resetPassword function
export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Hash the new password and update the user
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: 'Password has been reset successfully' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
