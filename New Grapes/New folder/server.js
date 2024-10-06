import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import uiRoute from './ui/ui.route'; // Assuming this is a valid route file
import pageRoute from './page/page.route'; // Adjust the path according to your folder structure


const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS

// Serve static resources
app.use('/resources', express.static(path.join(__dirname, 'public')));

// Serve views
app.use('/views', express.static(path.join(__dirname, 'views')));
app.set('view engine', 'hbs');

// MongoDB connection URI
const mongoUri = 'mongodb://localhost:27017/admin';

// Async function to connect to MongoDB and start the server
const startServer = async () => {
  try {
    // Mongoose connection without deprecated options
    await mongoose.connect(mongoUri);

    console.log('Connected to MongoDB');
    
    // Define routes
    app.use('/pages',pageRoute);
    app.use('/', uiRoute);
   

    // Start the server
    const PORT = process.env.APP_PORT || 8085;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
};

// Start the server
startServer();
