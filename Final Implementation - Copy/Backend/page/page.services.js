import Pages from './page.modal';

export const createPage = async (pageBody) => {
  console.log("pageBody received:", pageBody); // Log the received pageBody for debugging

  // Check if pageBody.name is a string
  if (typeof pageBody.name !== 'string') {
    throw new Error('Name must be a string');
  }

  // Generate the slug from the name
  const slug = pageBody.name.toLowerCase().split(' ').join('-');
  
  // Create a new page object with the required fields
  const page = new Pages({
    name: pageBody.name, // Directly assign name from pageBody
    slug: slug,          // Use the generated slug
    userId: pageBody.userId, // Directly use userId from pageBody
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
export const listPages = async (userId) => {
  const pages = await Pages.find({ userId }); // Find pages that match the userId
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
