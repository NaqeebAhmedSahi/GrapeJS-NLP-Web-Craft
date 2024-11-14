import express from 'express';
import Website from '../models/Template.js';

const router = express.Router();

// Create a new website with an initial template (HTML/CSS)
// POST route to add a new website
router.post('/', async (req, res) => {
    const { name } = req.body; // Get the website name from the request body
  
    if (!name) {
      return res.status(400).json({ message: 'Website name is required' });
    }
  
    try {
      // Create a new website with the provided name
      const newWebsite = new Website({
        name: name,
        content: {}, // Initialize the content as an empty object
      });
  
      // Save the website to the database
      const savedWebsite = await newWebsite.save();
  
      res.status(201).json(savedWebsite); // Send the saved website back to the client
    } catch (error) {
      console.error('Error adding website:', error);
      res.status(500).json({ message: 'Error adding website' });
    }
  });

// Get all websites (templates)
router.get('/', async (req, res) => {
    try {
      // Fetch all websites from the database
      const websites = await Website.find({});
      res.status(200).json(websites); // Send the list of websites to the frontend
    } catch (error) {
      console.error('Error fetching websites:', error);
      res.status(500).json({ message: 'Error fetching websites' });
    }
  });

// Add or update a page (HTML/CSS) to an existing website template
router.put('/:id/pages', async (req, res) => {
  const { pageKey, htmlFileName, htmlContent, cssFileName, cssContent } = req.body;

  try {
    const website = await Website.findById(req.params.id);
    if (!website) {
      return res.status(404).json({ message: 'Website not found' });
    }

    // Update the content with the new page details (html/css)
    website.content.set(pageKey, {
      htmlFileName: htmlFileName,
      htmlContent: htmlContent || '',
      cssFileName: cssFileName,
      cssContent: cssContent || ''
    });

    await website.save();
    res.json(website);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get details of a specific website template
router.get('/:id', async (req, res) => {
  try {
    const website = await Website.findById(req.params.id);
    if (!website) {
      return res.status(404).json({ message: 'Website not found' });
    }
    res.json(website);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a website template
router.delete('/:id', async (req, res) => {
  try {
    const website = await Website.findById(req.params.id);
    if (!website) {
      return res.status(404).json({ message: 'Website not found' });
    }

    await website.remove();
    res.json({ message: 'Website template deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a website template
router.delete('/:id', async (req, res) => {
    try {
      const website = await Website.findById(req.params.id);
      if (!website) {
        return res.status(404).json({ message: 'Website not found' });
      }
  
      await website.remove(); // Remove the website from the database
      res.json({ message: 'Website template deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

export default router;
