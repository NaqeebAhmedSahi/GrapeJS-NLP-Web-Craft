import axios from "axios";
import { API_HOST } from "../../api_utils";

export const TYPES = {
  LIST_PAGE_REQUEST_SEND: "LIST_PAGE_REQUEST_SEND",
  LIST_PAGE_REQUEST_ERROR: "LIST_PAGE_REQUEST_ERROR",
  LIST_PAGE_REQUEST_SUCCESS: "LIST_PAGE_REQUEST_SUCCESS",

  CREATE_PAGE_REQUEST: "CREATE_PAGE_REQUEST",
  CREATE_PAGE_ERROR: "CREATE_PAGE_ERROR",
  CREATE_PAGE_SUCCESS: "CREATE_PAGE_SUCCESS",
};

// Update the pageLoad action
export const pageLoad = () => async (dispatch) => {
  dispatch({ type: TYPES.LIST_PAGE_REQUEST_SEND });
  try {
    // Retrieve userId and websiteId from local storage
    const userId = localStorage.getItem('userId');
    const websiteId = localStorage.getItem('selectedWebsiteId'); // Ensure this key matches how you stored websiteId

    if (!userId || !websiteId) {
      throw new Error("User ID or Website ID is undefined");
    }

    // Fetch pages with userId and websiteId as query parameters
    const response = await axios.get(`${API_HOST}pages/`, { params: { userId, websiteId } });
    dispatch({ type: TYPES.LIST_PAGE_REQUEST_SUCCESS, data: response.data });
  } catch (error) {
    dispatch({ type: TYPES.LIST_PAGE_REQUEST_ERROR, error: error.message });
    console.error("Error loading pages:", error);
  }
};




export const createPage = (name) => async (dispatch) => {
  dispatch({ type: TYPES.CREATE_PAGE_REQUEST });
  try {
    // Retrieve userId and websiteId from local storage
    const userId = localStorage.getItem('userId');
    const websiteId = localStorage.getItem('selectedWebsiteId'); // Ensure the key matches how you stored the websiteId

    if (!userId || !websiteId) {
      throw new Error("User ID or Website ID is undefined");
    }

    // Send the page creation request with name, userId, and websiteId in the payload
    const response = await axios.post(`${API_HOST}pages/`, { 
      name, 
      userId, 
      websiteId 
    });
    
    dispatch({ type: TYPES.CREATE_PAGE_SUCCESS, data: response.data });
    dispatch(pageLoad()); // Refresh the page list after creating a new page
  } catch (error) {
    dispatch({ type: TYPES.CREATE_PAGE_ERROR, data: error.message });
    console.error("Error creating page:", error);
  }
};

