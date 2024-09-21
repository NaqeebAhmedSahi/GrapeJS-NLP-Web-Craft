// script.js

const editor = grapesjs.init({
  container: '#gjs',
  height: '100%',
  fromElement: false,
  storageManager: {
    autoload: false,
  },
  plugins: [
    'grapesjs-plugin-export',
    'grapesjs-blocks-basic',
    'grapesjs-preset-webpage',
    'grapesjs-plugin-forms',
    'grapesjs-component-countdown',
    'grapesjs-navbar',
    'grapesjs-style-bg',
    'grapesjs-pages',
    'grapesjs-tailwind' // Tailwind CSS Plugin
  ],
  pluginsOpts: {
    'grapesjs-tailwind': {
      tailwindCss: 'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css',
    },
    'grapesjs-preset-webpage': {},
    'grapesjs-blocks-basic': {},
    'grapesjs-plugin-forms': {},
    'grapesjs-component-countdown': {},
    'grapesjs-navbar': {},
    'grapesjs-style-bg': {},
    'grapesjs-pages': {},
  }
});

// Function to load external HTML content
function loadExternalHTML(url) {
  return fetch(url)
    .then(response => response.text())
    .then(htmlContent => {
      editor.addComponents(htmlContent);
    })
    .catch(err => console.error('Error loading external HTML:', err));
}

// Function to load external CSS
function loadExternalCSS(url) {
  fetch(url)
    .then(response => response.text())
    .then(cssContent => {
      editor.addStyle(cssContent);
    })
    .catch(err => console.error('Error loading external CSS:', err));
}

// Load 'contact.html' and 'styles.css' into the editor
loadExternalHTML('../ContactPage/contactUs.html');
loadExternalCSS('../ContactPage/styles.css');

// Customize the export command to include Tailwind CSS and custom CSS in the export
editor.Commands.add('export-project', {
  run(editor, sender) {
    sender && sender.set('active'); // Set button active state

    const zip = new JSZip();

    // Get HTML and CSS content from GrapesJS
    const htmlContent = editor.getHtml();
    const cssContent = editor.getCss();

    // Prepare the HTML content with links to external CSS
    const finalHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Exported Project</title>
  <!-- Link to Tailwind CSS -->
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
  <!-- Link to Custom CSS -->
  <style>${cssContent}</style>
</head>
<body>
  ${htmlContent}
</body>
</html>`;

    // Add HTML file to zip
    zip.file('index.html', finalHtml);

    // Add CSS file to zip (if needed)
    zip.file('style.css', cssContent);

    // Generate and download the zip file
    zip.generateAsync({ type: 'blob' }).then(content => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(content);
      link.download = 'project.zip';
      link.click();
    });
  },
});

// Ensure the default export button is clickable and visible
editor.on('load', () => {
  const exportButton = document.querySelector('.gjs-pn-btn.gjs-pn-btn-export');
  if (exportButton) {
    exportButton.style.position = 'fixed';
    exportButton.style.bottom = '20px';
    exportButton.style.left = '20px';
    exportButton.style.padding = '10px 20px';
    exportButton.style.backgroundColor = '#007bff';
    exportButton.style.color = '#fff';
    exportButton.style.border = 'none';
    exportButton.style.borderRadius = '4px';
    exportButton.style.cursor = 'pointer';
    exportButton.style.zIndex = '1000'; // Ensure it's on top
  }
});
