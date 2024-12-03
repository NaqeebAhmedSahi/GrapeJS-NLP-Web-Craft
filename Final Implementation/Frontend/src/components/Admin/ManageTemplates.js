import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminHeader from './AdminHeader';

const ManageTemplates = () => {
  const [websiteName, setWebsiteName] = useState('');
  const [websites, setWebsites] = useState([]);
  const navigate = useNavigate();

  // Fetch the list of websites on component mount
  useEffect(() => {
    axios.get('http://localhost:8080/api/templates')
      .then((response) => setWebsites(response.data))
      .catch((error) => console.error('Error fetching websites:', error));
  }, []);

  // Add a new website
  const addWebsite = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8080/api/templates', { name: websiteName })
      .then((response) => {
        alert(`Website ${websiteName} added successfully!`);
        setWebsiteName('');
        setWebsites([...websites, response.data]); // Add the new website to the list
      })
      .catch((error) => console.error('Error adding website:', error));
  };

  // Delete a website
  const deleteWebsite = (websiteId) => {
    if (window.confirm('Are you sure you want to delete this website?')) {
      axios.delete(`http://localhost:8080/api/templates/${websiteId}`)
        .then(() => {
          setWebsites(websites.filter((website) => website._id !== websiteId));
          alert('Website deleted successfully');
        })
        .catch((error) => console.error('Error deleting website:', error));
    }
  };

  // Update website name
  const updateWebsite = (websiteId, newName) => {
    axios.put(`http://localhost:8080/api/template/${websiteId}`, { name: newName })
      .then((response) => {
        const updatedWebsites = websites.map((website) =>
          website._id === websiteId ? { ...website, name: newName } : website
        );
        setWebsites(updatedWebsites);
        alert('Website updated successfully!');
      })
      .catch((error) => console.error('Error updating website:', error));
  };

  return (
    <div className="manage bg-light">
      <AdminHeader />
      <div className="container mt-4 mb-5 p-4 rounded shadow-sm bg-white">
        <h2 className="text-center mb-4 text-primary">Manage Website Templates</h2>

        {/* Form to add a new website */}
        <form onSubmit={addWebsite} className="mb-4">
          <div className="form-group">
            <label htmlFor="websiteName" className="font-weight-bold">Website Name:</label>
            <input
              type="text"
              className="form-control border-primary"
              id="websiteName"
              value={websiteName}
              onChange={(e) => setWebsiteName(e.target.value)}
              placeholder="Enter website name"
              required
            />
          </div>
          <button type="submit" className="btn btn-success btn-block">Add Website</button>
        </form>

        {/* Table displaying existing websites */}
        <h3 className="mb-3 text-secondary">Existing Websites:</h3>
        <div className="table-responsive">
          <table className="table table-hover table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>Website Name</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {websites.map((website) => (
                <tr key={website._id}>
                  <td className="align-middle">{website.name}</td>
                  <td className="text-center align-middle">
                    <button
                      className="btn btn-danger btn-sm mr-2"
                      onClick={() => deleteWebsite(website._id)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => navigate(`/manage-pages/${website._id}`)}
                    >
                      Manage Pages
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageTemplates;
