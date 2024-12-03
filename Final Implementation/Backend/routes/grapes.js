import express from 'express';
import mongoose from 'mongoose';
import Pages from '../page/page.modal'; // Replace with the correct path to your Page schema
import Websites from '../models/Template'; // Replace with the correct path to your Website schema

const router = express.Router();

router.post('/', async (req, res) => {
  const { websiteId, pageId } = req.body;
  console.log('Received request with websiteId:', websiteId, 'and pageId:', pageId);

  try {
    // Find the page in the database by pageId
    const page = await Pages.findOne({ _id: pageId });
    console.log('Page fetched from database:', page);

    if (!page) {
      console.log('Page not found with ID:', pageId);
      return res.status(404).json({ message: 'Page not found' });
    }

    // Check if the page is 'new'
    if (page.status === 'new') {
      console.log('Page status is new');
      return res.json({ status: 'new' });
    }

    // If the page is 'existing', fetch the website content
    if (page.status === 'existing') {
      console.log('Page status is existing, fetching website content');
      const website = await Websites.findOne({ _id: websiteId });

      // page.status = 'new'; // Update status to 'new'
      // await page.save();
      // console.log(`Page status updated to 'new' for page ID: ${pageId}`);

      if (!website) {
        console.log('Website not found with ID:', websiteId);
        return res.status(404).json({ message: 'Website not found' });
      }

      console.log('Website content fetched:', website.content);

      // Assuming the content in the website schema is a Map of pages (i.e., { pageName: content })
      const content = website.content;

      // If the content exists for the page name
      const pageName = page.name; // Get the name from the page schema

      if (!content || !content.has(pageName)) {
        return res.status(404).json({ message: `Content not found for page: ${pageName}` });
      }

      // Fetch content based on page name and send it back
      const pageContent = content.get(pageName); // This assumes `content` is a Map

      return res.json({
        status: 'existing',
        name: pageName, // Send the page name to the frontend
        content: pageContent, // Send the content
      });
    }

    // Handle unexpected page statuses
    console.log('Unexpected page status:', page.status);
    res.status(400).json({ message: 'Invalid page status' });
  } catch (error) {
    console.error('Error fetching page status or website content:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
