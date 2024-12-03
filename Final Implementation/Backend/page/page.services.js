import Pages from './page.modal';
import Website from '../models/Template';


export const storePages = async (req, res) => {
  try {
    const { websiteId, userId } = req.body;

    if (!websiteId || !userId) {
      return res.status(400).json({ message: 'websiteId and userId are required' });
    }

    console.log('Request Body: ', req.body);

    // Fetch the website document
    const website = await Website.findById(websiteId).lean(); // Use lean() to get a plain JavaScript object

    if (!website) {
      return res.status(404).json({ message: 'Website not found' });
    }

    const content = website.content;

    // Ensure content is a valid object
    if (!content || typeof content !== 'object') {
      return res.status(400).json({ message: 'Invalid or empty content in the website' });
    }

    // Extract valid keys (filter out any invalid Mongoose keys)
    const contentKeys = Object.keys(content).filter((key) => !key.startsWith('$'));
    console.log('Valid Keys are: ', contentKeys);

    // Prepare pages for insertion
    const pages = contentKeys.map((key) => {
      const pageContent = content[key];

      if (!pageContent || !pageContent.htmlFileName || !pageContent.htmlContent) {
        throw new Error(`Page with key "${key}" is missing required fields.`);
      }

      return {
        name: key,
        slug: key.toLowerCase().replace(/\s+/g, '-'),
        userId,
        websiteId,
        status: 'existing',
      };
    });

    // Check if the pages already exist in the database and only insert non-existing ones
    const existingPages = await Pages.find({
      websiteId,
      name: { $in: pages.map((page) => page.name) },
    }).lean();

    const existingPageNames = existingPages.map((page) => page.name);

    // Filter out pages that already exist in the database
    const pagesToInsert = pages.filter((page) => !existingPageNames.includes(page.name));

    if (pagesToInsert.length > 0) {
      // Insert the pages that don't already exist
      const savedPages = await Pages.insertMany(pagesToInsert);
      return res.status(200).json({
        message: `${savedPages.length} pages stored successfully`,
        savedPages,
      });
    } else {
      return res.status(200).json({ message: 'No new pages to store' });
    }
  } catch (err) {
    console.error('Error storing pages:', err.message || err);
    return res.status(500).json({ message: err.message || 'Internal server error' });
  }
};








export const createPage = async (pageBody) => {
  console.log("pageBody received:", pageBody); // Log the received pageBody for debugging

  // Check if pageBody.name is a string
  if (typeof pageBody.name !== 'string') {
    throw new Error('Name must be a string');
  }

  // Generate the slug from the name
  const slug = pageBody.name.toLowerCase().split(' ').join('-');
  
  // Create a new page object with the required fields, including websiteId
  const page = new Pages({
    name: pageBody.name, // Directly assign name from pageBody
    slug: slug,
              // Use the generated slug
    userId: pageBody.userId, // Directly use userId from pageBody
    websiteId: pageBody.websiteId, // Add websiteId
  });

  try {
    // Save the new page instance to the database
    const pageResponse = await page.save();
    return pageResponse; // Return the created page
  } catch (error) {
    console.error("Error creating page:", error); // Log any errors for debugging
    throw new Error('Error creating page: ' + error.message); // Rethrow the error for handling in the calling function
  }
};



// Backend - Update the listPages function
export const listPages = async (userId,websiteId) => {
  const pages = await Pages.find({ userId,websiteId }); // Find pages that match the userId
  return pages;
};

export const deletePage = async (pageId) => {};
export const updatePage = async (pageId, pageBody) => {};
export const pageDetails = async (pageId) => {
  const pages = await Pages.findOne({ _id: pageId });
  return pages;
};
export const savePageContent = async (pageId, content) => {
  const pageUpdated = await Pages.findOneAndUpdate({ _id: pageId }, { content });
  return pageUpdated;
};
export const findPageById = async (pageId) => {
  const page = await Pages.findById(pageId);
  return page;
};
