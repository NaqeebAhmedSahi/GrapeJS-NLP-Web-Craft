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
    console.log("Received email:", email); // Log email for debugging

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check that JWT_SECRET is defined
    if (!JWT_SECRET) {
      console.error("JWT_SECRET is not defined");
      return res.status(500).json({ message: 'Server error - Missing JWT secret' });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

    // Ensure express-session is configured
    if (req.session) {
      req.session.userId = user._id; // Store user ID in session
    } else {
      console.warn("Session is not initialized");
    }

    res.json({
      message: 'Login successful',
      token,
      userId: user._id
    });
  } catch (error) {
    console.error('Error signing in:', error.message, error.stack);
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
        subject: 'Password Reset Request',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333; background-color: #f9f9f9; border: 1px solid #ddd; border-radius: 8px;">
            <h2 style="text-align: center; color: #007bff;">Password Reset Request</h2>
            <p style="font-size: 16px; color: #555;">Hello ${user.name || 'User'},</p>
            <p style="font-size: 16px; color: #555;">You recently requested to reset your password. Click the button below to proceed with resetting your password:</p>
            
            <div style="text-align: center; margin: 20px 0;">
              <a href="http://localhost:3000/reset-password/${token}" 
                 style="padding: 10px 20px; font-size: 16px; color: #ffffff; background-color: #007bff; text-decoration: none; border-radius: 5px;">
                Reset Password
              </a>
            </div>
      
            <p style="font-size: 14px; color: #999; text-align: center;">Or copy and paste this URL into your browser:</p>
            <p style="font-size: 14px; color: #555; word-wrap: break-word; text-align: center;">
              <a href="http://localhost:3000/reset-password/${token}" style="color: #007bff; text-decoration: none;">
                http://localhost:3000/reset-password/${token}
              </a>
            </p>
      
            <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
            
            <p style="font-size: 14px; color: #555;">If you did not request a password reset, please ignore this email. Your password will remain unchanged.</p>
            
            <p style="font-size: 14px; color: #555;">Thank you,</p>
            <p style="font-size: 14px; color: #555; font-weight: bold;">Grapes: NLP Web Craft</p>
            <p style="font-size: 12px; color: #aaa; text-align: center;">© ${new Date().getFullYear()} All rights reserved.</p>
          </div>
        `
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
