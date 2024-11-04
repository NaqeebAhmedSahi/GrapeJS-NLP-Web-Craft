import { API_HOST, create_page } from "./api_utils";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [pages, setPages] = useState([]); // Store fetched pages
  const [isValid, setIsValid] = useState(true); // Track form validity
  const [name, setName] = useState(""); // Track name input value
  const [error, setError] = useState(""); // Track errors (e.g. API errors)
  const [showSuccess, setShowSuccess] = useState(false); // Success alert visibility

  // Handle form submission
  const handleSubmit = async () => {
    if (!name) {
      setIsValid(false); // Mark form as invalid if no name
      return;
    }
    try {
      const newPage = await create_page(name);
      setPages([...pages, newPage]); // Add new page to the list
      setName(""); // Clear the name field
      setIsValid(true); // Reset form validation state
      setShowSuccess(true); // Show success notification
      setTimeout(() => setShowSuccess(false), 3000); // Hide notification after 3 seconds
    } catch (err) {
      setError("Error creating page, please try again.");
    }
  };

  // Fetch all pages from the API when the component mounts
  useEffect(() => {
    async function getAllPages() {
      try {
        const response = await axios.get(`${API_HOST}/`);
        setPages(response.data); // Set pages data to state
      } catch (error) {
        console.log("Error fetching pages >>", error);
        setError(error.message); // Display error message if API call fails
      }
    }
    getAllPages();
  }, []);

  // Clear form logic
  const clearForm = () => {
    setName(""); // Reset form name field
    setIsValid(true); // Reset form validation
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg">
            <div className="card-header bg-primary text-white">
              <h5 className="card-title mb-0">Create a New Page</h5>
            </div>
            <div className="card-body">
              <form id="create-page">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Page Name</label>
                  <input
                    type="text"
                    className={`form-control ${isValid ? "" : "is-invalid"}`}
                    id="name"
                    name="name"
                    placeholder="Enter page name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {!isValid && (
                    <div className="invalid-feedback">
                      Please provide a valid name.
                    </div>
                  )}
                </div>
                <div className="d-flex justify-content-between">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick={clearForm}
                  >
                    Clear
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSubmit}
                  >
                    Save Page
                  </button>
                </div>
              </form>

              {/* Success Notification */}
              {showSuccess && (
                <div className="alert alert-success mt-3" role="alert">
                  Page created successfully!
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-12 my-4">
          {error && (
            <div role="alert" className="alert alert-danger">
              {error}
            </div>
          )}

          <div className="card shadow-lg">
            <div className="card-header bg-dark text-white">
              <h5 className="card-title mb-0">Available Pages</h5>
            </div>
            <div className="card-body p-0">
              <table className="table table-striped table-hover mb-0">
                <thead className="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Slug</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pages && pages.length > 0 ? (
                    pages.map((page) => (
                      <tr key={page._id}>
                        <td>{page._id}</td>
                        <td>{page.name}</td>
                        <td>{page.slug}</td>
                        <td>
                          <Link
                            to={`/editor/${page._id}`}
                            className="btn btn-sm btn-outline-primary"
                          >
                            Edit
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center">
                        No Pages Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
