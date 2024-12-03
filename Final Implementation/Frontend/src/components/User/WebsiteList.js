import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const WebsiteList = () => {
  const [websites, setWebsites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  // Fetch userId from localStorage (assuming user is already logged in)
  const userId = localStorage.getItem('userId');
  console.log("User Id", userId);

  // Initialize navigate
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch websites from the backend
    const fetchWebsites = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/templates'); // Update API route as needed
        setWebsites(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching websites: ' + err.message);
        setLoading(false);
      }
    };

    fetchWebsites();
  }, []);

  // Handle selecting a website and sending data to the backend
  const handleChoose = async (websiteId) => {
    try {

      localStorage.setItem('selectedWebsiteId', websiteId);
      // Send request to store pages for the selected website
      const response = await axios.post('http://localhost:8080/api/pages/store', {
        websiteId,
        userId, // Send the userId and websiteId to the backend
      });
  
      setMessage(response.data.message);
      setError(null); // Clear previous errors
  
      // After successful response, redirect to /home
      navigate('/home'); // Ensure the correct redirect path
    } catch (err) {
      setError('Failed to store pages: ' + err.message);
      setMessage(null); // Clear success message on error
    }
  };
  

  if (loading) {
    return <div>Loading websites...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Website List</h2>
      {websites.length === 0 ? (
        <p className="text-center">No websites found.</p>
      ) : (
        <table className="table table-striped table-hover">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">ID</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {websites.map((website) => (
              <tr key={website._id}>
                <td>{website.name}</td>
                <td>{website._id}</td>
                <td>
                  <button
                    onClick={() => handleChoose(website._id)}
                    className="btn btn-primary"
                  >
                    Choose This One
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Success or Error Message */}
      {message && <div className="alert alert-success mt-3">{message}</div>}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
};

export default WebsiteList;
