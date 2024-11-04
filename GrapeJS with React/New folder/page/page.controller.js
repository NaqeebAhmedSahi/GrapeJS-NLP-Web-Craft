import { createPage, deletePage, listPages, pageDetails, savePageContent, updatePage } from './page.services';
import { createWriteStream } from 'fs';
import archiver from 'archiver'; // Make sure to install archiver
import PageModel from './page.modal';


export const create = async (req, res) => {
  const pageBody = req.body;
  const page = await createPage(pageBody);
  res.json(page);
  
};

export const list = async (req, res) => {
  const pages = await listPages();
  res.json(pages);
};

export const details = async (req, res) => {
  const { pageId } = req.params;
  const details = await pageDetails(pageId);
  res.json(details);
};

export const deletePageRecord = async (req, res) => {
  const { pageId } = req.params; // Extract pageId from request parameters
  
  // Validate pageId (optional but recommended)
  if (!pageId) {
    return res.status(400).json({ message: 'Page ID is required' });
  }

  try {
    const result = await PageModel.findByIdAndDelete(pageId);
    
    if (result) {
      return res.status(200).json({ message: 'Page deleted successfully' }); // Success response
    } else {
      return res.status(404).json({ message: 'Page not found' }); // Handle case where page is not found
    }
  } catch (error) {
    console.error('Error deleting page:', error);
    return res.status(500).json({ message: 'Error deleting the page' }); // Handle unexpected errors
  }
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

export const downloadAllPages = async (req, res) => {
  try {
    const pages = await listPages(); // Fetch all pages
    console.log('Pages:', pages); // Log pages to check structure

    // Set up the response for downloading a zip file
    res.attachment('pages.zip'); // Name of the zip file

    const archive = archiver('zip', {
      zlib: { level: 9 } // Set the compression level
    });

    archive.pipe(res);

    // Loop through each page to add HTML and CSS files
    for (let i = 0; i < pages.length; i++) {
      const page = pages[i]; // Access the page by index

      // Check if content exists before trying to access it
      if (page.content) {
        const htmlContent = page.content['mycustom-html'] || '';
        const cssContent = page.content['mycustom-css'] || ''; // Assuming this is your CSS content

        // Create filenames based on the slug
        const htmlFilename = `${page.slug}.html`;
        const cssFilename = `${page.slug}.css`; // Create a filename for the CSS file

        // Create the full HTML content with external CSS link
        const fullHtmlContent = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${page.name}</title>
            <link rel="stylesheet" href="${cssFilename}"> <!-- Link to the CSS file -->
          </head>
          <body>
            ${htmlContent}
          </body>
          </html>
        `;

        // Only append the HTML file if it exists
        if (htmlContent.trim() !== '') {
          archive.append(fullHtmlContent, { name: htmlFilename });
        } else {
          console.log(`Skipped HTML for page: ${page.slug} - No content available.`);
        }

        // Append the CSS file to the archive
        if (cssContent.trim() !== '') {
          archive.append(cssContent, { name: cssFilename });
        } else {
          console.log(`Skipped CSS for page: ${page.slug} - No CSS available.`);
        }
      } else {
        console.log(`Skipped page: ${page.slug} - No content property available.`);
      }
    }

    await archive.finalize(); // Finalize the archive
  } catch (error) {
    console.error('Error downloading pages:', error);
    // Ensure the response is not sent if already ended
    if (!res.headersSent) {
      res.status(500).send('Failed to download pages');
    }
  }
};
