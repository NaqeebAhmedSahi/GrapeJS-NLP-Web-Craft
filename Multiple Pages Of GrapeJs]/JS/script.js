const editor = grapesjs.init({
    container: '#gjs',
    fromElement: true,
    height: '100%',
    width: 'auto',
    storageManager: false, // Disable built-in storage manager
    plugins: ['gjs-preset-webpage'], // Optional preset plugin
});

// Manage the pages
const pages = {};
let currentPage = 'page1';

// Function to create a new page
const addPage = (pageName) => {
    if (!pages[pageName]) {
        pages[pageName] = editor.getHtml();
        const pageBtn = document.createElement('button');
        pageBtn.innerText = pageName;
        pageBtn.addEventListener('click', () => loadPage(pageName));
        document.getElementById('pagesList').appendChild(pageBtn);
    }
};

// Load the content of the selected page
const loadPage = (pageName) => {
    if (pages[pageName]) {
        pages[currentPage] = editor.getHtml();
        currentPage = pageName;
        editor.setComponents(pages[pageName]);
    }
};

// Add a default page
addPage('page1');

// Add more pages on button click
document.getElementById('addPageBtn').addEventListener('click', () => {
    const pageName = `page${Object.keys(pages).length + 1}`;
    addPage(pageName);
    loadPage(pageName); // Load the newly created page
});
