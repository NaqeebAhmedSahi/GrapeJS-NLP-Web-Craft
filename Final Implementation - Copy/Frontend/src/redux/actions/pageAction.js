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
    // Retrieve userId from local storage
    const userId = localStorage.getItem('userId'); // Ensure this key matches how you stored the userId

    // Fetch pages with the userId included as a query parameter
    const response = await axios.get(`${API_HOST}pages/`, { params: { userId } });
    dispatch({ type: TYPES.LIST_PAGE_REQUEST_SUCCESS, data: response.data });
  } catch (error) {
    dispatch({ type: TYPES.LIST_PAGE_REQUEST_ERROR, error: error });
  }
};



export const createPage = (name) => async (dispatch) => {
  dispatch({ type: TYPES.CREATE_PAGE_REQUEST });
  try {
    // Retrieve userId from local storage
    const userId = localStorage.getItem('userId'); // Ensure this key matches how you stored the userId

    const response = await axios.post(`${API_HOST}pages/`, { 
      name, 
      userId // Include userId in the request body
    });
    
    dispatch({ type: TYPES.CREATE_PAGE_SUCCESS, data: response.data });
    dispatch(pageLoad()); 
  } catch (error) {
    dispatch({ type: TYPES.CREATE_PAGE_ERROR, data: error });
  }
};
