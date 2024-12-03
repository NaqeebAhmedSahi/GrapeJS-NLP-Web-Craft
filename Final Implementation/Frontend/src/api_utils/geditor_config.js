import grapesjs from "grapesjs";
import gjsBlockBasic from "grapesjs-blocks-basic";
import $ from "jquery";
import grapesjsBlockBootstrap from "grapesjs-blocks-bootstrap4";
import grapesjsPluginExport from "grapesjs-plugin-export";
import grapesjsStyleBg from "grapesjs-style-bg";
import axios from "axios";

import {
  addEditorCommand,
  deviceManager,
  layerManager,
  panels,
  scripts,
  selectorManager,
  storageSetting,
  styleManager,
  styles,
  traitManager,
} from "./geditor_utils";
import tailwindComponent from "../plugins/tailwind";
import swiperComponent from "../plugins/swiper";
import chartLibComponent from "../plugins/charts";

// Counter variable to prevent re-initialization
let renderCount = false;
console.log("Render Count", renderCount);

/**
 * Fetch page content from the backend
 * @param {string} websiteId - The ID of the website
 * @param {string} pageId - The ID of the page
 * @returns {Promise<{htmlContent: string, cssContent: string, message: string}>} - Page content and status
 */
const fetchPageContent = async (websiteId, pageId) => {
  try {
    const response = await axios.post("http://localhost:8080/api/status", {
      websiteId,
      pageId,
    });

    console.log("API Response:", response.data);  // Log the full response for debugging

    // Check if the status is 'new'
    if (response.data.status === 'new') {
      return { htmlContent: "", cssContent: "", message: "new" };
    }

    // If status is 'existing', get the page name and content
    const { name, content } = response.data;
    if (!content) {
      throw new Error("Content is missing or undefined in the response.");
    }

    // Use the page name and fetch content based on the name
    const pageContent = content; // Get the content by page name
    console.log("Page Content",pageContent);

    if (!pageContent) {
      return { htmlContent: "", cssContent: "", message: "No content found" };
    }

    const { htmlContent, cssContent } = pageContent;
    return { htmlContent, cssContent, message: "existing" };
  } catch (error) {
    console.error("Error fetching page content:", error);
    throw new Error("Error loading content from the backend");
  }
};




/**
 * Initialize GrapesJS editor with configuration
 * @param {Array} assets - Assets for the Asset Manager
 * @param {string} pageId - Page ID for storage
 * @returns {Promise<any>} - The initialized editor instance
 */
const geditorConfig = async (assets, pageId) => {
  const websiteId = localStorage.getItem("selectedWebsiteId");
  if (!websiteId) {
    console.error("Website ID not found in localStorage.");
    return;
  }

  // Check if the editor is already initialized
  if (renderCount) {
    console.log("GrapesJS editor is already initialized.");
    renderCount = false;
    return;
  }

  // Increment render count
  renderCount = true;

  // Clear GrapesJS-related DOM containers (only once during initialization)
  $(".panel__devices").html("");
  $(".panel__basic-actions").html("");
  $(".panel__editor").html("");
  $("#blocks").html("");
  $("#styles-container").html("");
  $("#layers-container").html("");
  $("#trait-container").html("");

  // Fetch content for the page
  const { htmlContent, cssContent, message } = await fetchPageContent(
    websiteId,
    pageId
  );

  if (message === "new") {
    console.log("This is a new page.");
  } else if (message === "Error loading content") {
    console.error("Error loading content from the backend.");
  } else {
    console.log("Loaded existing content:", htmlContent);
  }

  // Content for Preview
  const navbar = $("#navbar");
  const mainContent = $("#main-content");
  const panelTopBar = $("#main-content > .navbar-light");

  // Initialize GrapesJS editor
  const editorConfig = {
    container: "#editor",
    blockManager: {
      appendTo: "#blocks",
    },
    styleManager: styleManager,
    layerManager: layerManager,
    traitManager: traitManager,
    selectorManager: selectorManager,
    panels: panels,
    deviceManager: deviceManager,
    assetManager: { assets: assets, upload: false },
    storageManager: storageSetting(pageId),
    canvas: {
      styles: styles,
      scripts: scripts,
    },
    plugins: [
      tailwindComponent,
      gjsBlockBasic,
      swiperComponent,
      grapesjsBlockBootstrap,
      grapesjsPluginExport,
      grapesjsStyleBg,
      chartLibComponent,
    ],
    pluginsOpts: {
      tailwindComponent: {},
      gjsBlockBasic: {},
      swiperComponent: {},
      grapesjsBlockBootstrap: {},
      grapesjsPluginExport: {},
      grapesjsStyleBg: {},
      chartLibComponent: {},
    },
  };

  // Conditionally set components and style only if the page is not new
  if (message !== "new") {
    editorConfig.components = htmlContent || ""; // Use empty string if no content is loaded
    editorConfig.style = cssContent || ""; // Use empty string if no style is loaded
  }

  const editor = grapesjs.init(editorConfig);
  addEditorCommand(editor);

  // Event handlers
  editor.on("run:preview", () => {
    console.log("It will trigger when we click on preview icon");
    editor.stopCommand("sw-visibility");
    navbar.removeClass("sidebar");
    mainContent.removeClass("main-content");
    panelTopBar.addClass("d-none");
  });

  editor.on("stop:preview", () => {
    console.log("It will trigger when we click on cancel preview icon");
    editor.runCommand("sw-visibility");
    navbar.addClass("sidebar");
    mainContent.addClass("main-content");
    panelTopBar.removeClass("d-none");
  });

  editor.on("component:selected", (component) => {
    const newTool = {
      icon: "fa fa-plus-square",
      title: "Check Toolbar",
      commandName: "new-tool-cmd",
      id: "new-tool",
    };

    const defaultToolbar = component.get("toolbar");
    const checkAlreadyExist = defaultToolbar.find(
      (toolbar) => toolbar.command === newTool.commandName
    );
    if (!checkAlreadyExist) {
      defaultToolbar.unshift({
        id: newTool.id,
        attributes: { class: newTool.icon, title: newTool.title },
        command: newTool.commandName,
      });
      component.set("toolbar", defaultToolbar);
    }
  });

  setTimeout(() => {
    let categories = editor.BlockManager.getCategories();
    categories.each((category) => category.set("open", false));
  }, 1000);

  console.log("GrapesJS editor initialized successfully.");
  return editor;
};

export default geditorConfig;
