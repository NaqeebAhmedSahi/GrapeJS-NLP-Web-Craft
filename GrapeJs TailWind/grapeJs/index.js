// Handle Tailwind's use of slashes in CSS names
const escapeName = (name) => `${name}`.trim().replace(/([^a-z0-9\w-:/]+)/gi, '-');

// Initialize GrapesJS editor
const editor = grapesjs.init({
  container: '#gjs',
  height: '100%',
  storageManager: false,
  selectorManager: { escapeName },
  plugins: ['grapesjs-tailwind'],
  pluginsOpts: {
    'grapesjs-tailwind': {
      // Ensure Tailwind plugin is initialized correctly
    },
  },
  // Components to load initially
  components: `
    <div class="container mx-auto p-6 bg-gray-200 rounded-lg shadow-md">
      <h1 class="text-4xl font-bold text-center mb-6">Contact Us</h1>
      <form class="space-y-4">
        <div class="flex flex-col">
          <label class="mb-1 text-sm font-medium text-gray-700">Full Name</label>
          <input type="text" class="border border-gray-300 rounded-md p-2" placeholder="Enter your full name" />
        </div>
        <div class="flex flex-col">
          <label class="mb-1 text-sm font-medium text-gray-700">Email Address</label>
          <input type="email" class="border border-gray-300 rounded-md p-2" placeholder="Enter your email" />
        </div>
        <div class="flex flex-col">
          <label class="mb-1 text-sm font-medium text-gray-700">Message</label>
          <textarea class="border border-gray-300 rounded-md p-2 h-32" placeholder="Enter your message"></textarea>
        </div>
        <div class="text-center">
          <button type="submit" class="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
            Submit
          </button>
        </div>
      </form>
      <p class="text-center mt-6 text-sm text-gray-600">Feel free to edit this form using the editor!</p>
    </div>
  `,
  // Styling with Tailwind
  style: `
    .container {
      @apply p-6 mx-auto bg-gray-200 rounded-lg shadow-md;
    }
    h1 {
      @apply text-4xl font-bold text-center mb-6;
    }
    form {
      @apply space-y-4;
    }
    label {
      @apply text-sm font-medium text-gray-700 mb-1;
    }
    input, textarea {
      @apply border border-gray-300 rounded-md p-2;
    }
    button {
      @apply bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700;
    }
    p {
      @apply text-center mt-6 text-sm text-gray-600;
    }
  `,
});
