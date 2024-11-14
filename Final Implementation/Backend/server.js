import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import uiRoute from './ui/ui.route';
import pageRoute from './page/page.route';
import assetRoute from './assets/assets.route';
import projectRoute from './project/project.route';
import renderHtml from './render/render.controller';
import bodyParser from 'body-parser';
import session from 'express-session'; // Import express-session
import authRoutes from './routes/auth.js';  // Import auth routes
import contactRoutes from './routes/contact.js';
import adminRoutes from './routes/admin.js';
import templateRoutes from './routes/template.js';
import pageRoutes from './routes/page.js';

import { JWT_SECRET } from './config.js'; // Import your JWT_SECRET

// Initialize App
const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.json()); // You can remove this if express.json() is enough for your needs

// CORS Configuration
const corsOptions = {
  origin: (origin, callback) => {
    callback(null, true);
  },
  credentials: true, // Allow credentials
};
app.use(cors(corsOptions));

// Session Configuration
app.use(session({
  secret: JWT_SECRET, // Use JWT_SECRET as your session secret
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.NODE_ENV === 'production' } // Use secure cookies in production
}));

// HTML and Static Files
app.use('/resources', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views')); // Ensure the views path is correctly set
app.set('view engine', 'hbs');

// MongoDB Connection
const mongoUri = 'mongodb://localhost:27017/webpage_builder';
mongoose.connect(
  mongoUri,
  {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log('Connected to MongoDB');
  },
);

// Route Configurations
app.use('/api/projects', projectRoute);
app.use('/api/pages', pageRoute);
app.use('/api/assets', assetRoute);
app.use('/api/', uiRoute);
app.get('/:pageId?', renderHtml);
app.use('/api/auth', authRoutes);  // Use auth routes
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/templates', templateRoutes);
app.use('/api/page', pageRoutes); 


// Start Server
const PORT = process.env.APP_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
