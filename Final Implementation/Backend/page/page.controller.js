import {
  createPage,
  deletePage,
  listPages,
  pageDetails,
  savePageContent,
  updatePage,
  storePages,
} from './page.services';

// Assuming the use of async/await with Express
export const storePagesController = async (req, res) => {
  try {
    // Call the service function
    await storePages(req, res);
  } catch (err) {
    // Handle any unexpected errors
    res.status(500).json({ message: 'Error in page controller' });
  }
};


export const create = async (req, res) => {
  console.log("Incoming request body:", req.body); // Log incoming request for debugging

  try {
    // Destructure the nested name, userId, and websiteId from the request body
    const { name: nameObj, userId: incomingUserId, websiteId: incomingWebsiteId } = req.body;

    // Access the actual name and userId from the nested object
    const pageName = nameObj.name; // Extract the name
    const nestedUserId = nameObj.userId; // Extract the userId from the nested object

    // Validate that the pageName is a string and websiteId is present
    if (typeof pageName !== 'string' || !pageName) {
      return res.status(400).json({ message: 'Name is required and must be a string.' });
    }
    if (!nestedUserId) {
      return res.status(400).json({ message: 'User ID from the name object is required.' });
    }
    if (!incomingWebsiteId) {
      return res.status(400).json({ message: 'Website ID is required.' });
    }

    // Create the page body with the necessary fields
    const pageBody = {
      name: pageName, // Correctly assign the name from the nested object
      slug: pageName.toLowerCase().split(' ').join('-'), // Generate slug from the pageName
      userId: nestedUserId || incomingUserId, // Use nested userId or incoming userId if needed
      websiteId: incomingWebsiteId, // Add the websiteId to the page body
    };

    console.log("Page body to create:", pageBody); // Log the page body for debugging

    const page = await createPage(pageBody); // Call the service to create the page
    res.status(201).json(page); // Return the created page
  } catch (error) {
    console.error("Error creating page:", error); // Log error details for debugging
    res.status(500).json({ message: 'An error occurred while creating the page.', error: error.message });
  }
};





export const list = async (req, res) => {
  const { userId, websiteId } = req.query; // Get userId from query parameters
  try {
    const pages = await listPages(userId, websiteId); // Pass userId to the service
    res.json(pages);
  } catch (error) {
    console.error("Error listing pages:", error);
    res.status(500).json({ message: 'Error retrieving pages', error: error.message });
  }
};

export const details = async (req, res) => {
  const { pageId } = req.params;
  const details = await pageDetails(pageId);
  res.json(details);
};
export const deletePageRecord = async (req, res) => {
  const { pageId } = req.params;
  const data = await deletePage(pageId);
  res.json(data);
};
export const update = async (req, res) => {
  const { pageId } = req.params;
  const pageBody = req.body;
  const page = await updatePage(pageId, pageBody);
  res.json(page);
};
export const changeContent = async (req, res) => {
  const { pageId } = req.params;
  const pageContent = await savePageContent(pageId, req.body);
  res.json(pageContent);
};
export const loadContent = async (req, res) => {
  const { pageId } = req.params;
  res.header('Content-Type', 'application/json');
  const pageData = await pageDetails(pageId);
  res.json(pageData.content);
};
