// Initialize GrapesJS with all the plugins
const editor = grapesjs.init({
  container: '#gjs',
  height: '100%',
  fromElement: true,
  storageManager: false,
  selectorManager: {
    escapeName: (name) => `${name}`.trim().replace(/([^a-z0-9\w-:/]+)/gi, '-'),
  },
  plugins: [
    'grapesjs-tailwind',
    'grapesjs-blocks-basic',
    'grapesjs-preset-webpage',
    'grapesjs-plugin-forms',
    'grapesjs-component-countdown',
    'grapesjs-navbar',
    'grapesjs-plugin-export',
    'grapesjs-style-bg',
    'grapesjs-pages',
  ],
  pluginsOpts: {
    'grapesjs-tailwind': {
      tailwindCss: 'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css',
    },
  },
});

// Handle Add Page button click
const pageDrag = document.getElementById('page-drag');
pageDrag.addEventListener('click', () => {
  const newPageId = `page-${Date.now()}`;
  const newPageName = `New Page ${Date.now()}`;
  const pages = editor.Pages;

  console.log('Adding new page:', newPageId, newPageName); // Debug log

  pages.add({
    id: newPageId,
    name: newPageName,
    content: '<div class="container mx-auto p-4">This is a new page!</div>',
  });
  pages.setActive(newPageId); // Set the new page as active
  console.log('New page added and activated:', newPageId); // Debug log
});
