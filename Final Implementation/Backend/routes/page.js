import express from 'express';
import Website from '../models/Template.js'; // Import the Website model

const router = express.Router();
// Add a new page to a website
router.post('/:websiteId', async (req, res) => {
    const { websiteId } = req.params;
    const { pageName, htmlFileName, htmlContent, cssFileName, cssContent } = req.body;
  
    try {
      const website = await Website.findById(websiteId);
      if (!website) {
        return res.status(404).json({ message: 'Website not found' });
      }
  
      if (website.content.has(pageName)) {
        return res.status(400).json({ message: 'Page already exists' });
      }
  
      // Add the new page content
      website.content.set(pageName, {
        htmlFileName,
        htmlContent,
        cssFileName,
        cssContent,
      });
  
      // Save the updated website document
      await website.save();
  
      res.status(201).json({ pageName, htmlFileName, htmlContent, cssFileName, cssContent });
    } catch (error) {
      console.error('Error adding page:', error);
      res.status(500).json({ message: 'Error adding page' });
    }
  });


  // Get all pages for a specific website
router.get('/:websiteId', async (req, res) => {
    const { websiteId } = req.params;
  
    try {
      const website = await Website.findById(websiteId);
      if (!website) {
        return res.status(404).json({ message: 'Website not found' });
      }
  
      // Convert Map to array of pages
      const pages = Array.from(website.content, ([pageName, content]) => ({
        pageName,
        htmlFileName: content.htmlFileName,
        htmlContent: content.htmlContent,
        cssFileName: content.cssFileName,
        cssContent: content.cssContent,
      }));
  
      res.json(pages);
    } catch (error) {
      console.error('Error fetching pages:', error);
      res.status(500).json({ message: 'Error fetching pages' });
    }
  });
  
// Update a specific page for a website
router.put('/:websiteId/:pageName', async (req, res) => {
    const { websiteId, pageName } = req.params;
    const { htmlFileName, htmlContent, cssFileName, cssContent } = req.body;
  
    try {
      const website = await Website.findById(websiteId);
      if (!website) {
        return res.status(404).json({ message: 'Website not found' });
      }
  
      if (!website.content.has(pageName)) {
        return res.status(404).json({ message: 'Page not found' });
      }
  
      // Update page content
      const pageContent = website.content.get(pageName);
      pageContent.htmlFileName = htmlFileName || pageContent.htmlFileName;
      pageContent.htmlContent = htmlContent || pageContent.htmlContent;
      pageContent.cssFileName = cssFileName || pageContent.cssFileName;
      pageContent.cssContent = cssContent || pageContent.cssContent;
  
      // Save the updated website document
      await website.save();
  
      res.json({ pageName, htmlFileName: pageContent.htmlFileName, htmlContent: pageContent.htmlContent, cssFileName: pageContent.cssFileName, cssContent: pageContent.cssContent });
    } catch (error) {
      console.error('Error updating page:', error);
      res.status(500).json({ message: 'Error updating page' });
    }
  });

  // Delete a page from a website
router.delete('/:websiteId/:pageName', async (req, res) => {
    const { websiteId, pageName } = req.params;
  
    try {
      const website = await Website.findById(websiteId);
      if (!website) {
        return res.status(404).json({ message: 'Website not found' });
      }
  
      if (!website.content.has(pageName)) {
        return res.status(404).json({ message: 'Page not found' });
      }
  
      // Remove the page from the content map
      website.content.delete(pageName);
  
      // Save the updated website document
      await website.save();
  
      res.json({ message: 'Page deleted successfully' });
    } catch (error) {
      console.error('Error deleting page:', error);
      res.status(500).json({ message: 'Error deleting page' });
    }
  });
  
  
export default router;
