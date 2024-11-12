// routes/contact.js
import express from 'express';
import mongoose from 'mongoose';
import { JWT_SECRET } from '../config.js'; // Import your JWT secret key
import jwt from 'jsonwebtoken';

const router = express.Router();

// Define the Contact model
const Contact = mongoose.model('Contact', new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: String,
    email: String,
    message: String
}));

router.post('/', async (req, res) => {
    try {
        // Extract token from the request headers (if necessary)
        const token = req.headers['authorization'] ? req.headers['authorization'].split(' ')[1] : null;
// Assuming 'Bearer <token>'
        let userId;

        // Verify the token if it exists
        if (token) {
            const decoded = jwt.verify(token, JWT_SECRET);
            userId = decoded.id; // Get userId from decoded token
        }

        const { name, email, message } = req.body;

        const newContact = new Contact({
            userId,
            name,
            email,
            message
        });

        await newContact.save();
        res.status(201).json({ message: 'Contact saved successfully!' });
    } catch (error) {
        console.error('Error saving contact:', error); // Log the error for debugging
        res.status(500).json({ message: 'Internal Server Error' });
    }
});




export default router;
