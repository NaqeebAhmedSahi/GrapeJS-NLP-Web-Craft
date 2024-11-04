import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import authRoutes from './routes/auth.js';  // Import routes
import contactRoutes from './routes/contact.js';
import adminRoutes from './routes/admin.js';


// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB URI
const mongoUri = 'mongodb://localhost:27017/webpage_builder';

// Connect to MongoDB
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);  // Use auth routes
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
