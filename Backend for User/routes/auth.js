import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import User from '../models/User.js';

// Set JWT Secret directly
const JWT_SECRET = 'your_jwt_secret_key';

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create a new userId
    const userId = uuidv4();

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save the new user
    user = new User({
      username,
      email,
      password: hashedPassword,
      userId,
    });

    await user.save();

    // Generate a JWT token
    const payload = { user: { id: user.id } };
    jwt.sign(
      payload,
      JWT_SECRET,
      { expiresIn: 3600 }, // 1 hour
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Login a user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Generate a JWT token
    const payload = { user: { id: user.id } };
    jwt.sign(
      payload,
      JWT_SECRET,
      { expiresIn: 3600 }, // 1 hour
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

export default router;
