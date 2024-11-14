import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ManagePages = () => {
  const { websiteId } = useParams();
  const [pages, setPages] = useState([]); // Initialize as empty array
  const [pageName, setPageName] = useState('');
  const [htmlFileName, setHtmlFileName] = useState('');
  const [htmlContent, setHtmlContent] = useState('');
  const [cssFileName, setCssFileName] = useState('');
  const [cssContent, setCssContent] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedPage, setSelectedPage] = useState(null); // To hold the selected page data for update
  const [updateOption, setUpdateOption] = useState('code'); // Option to choose between file upload or code editing
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the pages for the current website
    console.log('Fetching pages for websiteId:', websiteId); // Log the websiteId being fetched
    axios.get(`http://localhost:8080/api/page/${websiteId}`)
      .then(response => {
        console.log('Response from backend:', response.data); // Log the data received from the backend
        setPages(response.data || []); // Ensure pages are set correctly as an array
      })
      .catch(error => {
        console.error('Error fetching pages:', error); // Log any errors
      });
  }, [websiteId]); // Re-fetch pages if the websiteId changes

  const handleHtmlFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setHtmlFileName(file.name);
      const reader = new FileReader();
      reader.onload = () => setHtmlContent(reader.result);
      reader.readAsText(file);
    }
  };


  const handleCssFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCssFileName(file.name);
      const reader = new FileReader();
      reader.onload = () => setCssContent(reader.result);
      reader.readAsText(file);
    }
  };

  const addPage = (event) => {
    event.preventDefault();
    axios.post(`http://localhost:8080/api/page/${websiteId}`, {
      pageName,
      htmlFileName,
      htmlContent,
      cssFileName,
      cssContent,
    })
      .then(response => {
        setPages([...pages, response.data]);
        alert('Page added successfully!');
        setPageName('');
        setHtmlFileName('');
        setHtmlContent('');
        setCssFileName('');
        setCssContent('');
      })
      .catch(error => console.error('Error adding page:', error));
  };

  const deletePage = (pageName) => {
    if (window.confirm('Are you sure you want to delete this page?')) {
      axios.delete(`http://localhost:8080/api/page/${websiteId}/${pageName}`)
        .then(() => {
          setPages(pages.filter(page => page.pageName !== pageName));
          alert('Page deleted successfully');
        })
        .catch(error => console.error('Error deleting page:', error));
    }
  };

  const handleUpdatePage = (page) => {
  // Navigate to the UpdatePage component with the selected page's data
  navigate(`/updatePage/${websiteId}/${page.pageName}`, { state: page });
};

  const handleUpdate = (event) => {
    event.preventDefault();

    // Prepare the updated data
    const updatedData = {
      htmlContent: updateOption === 'code' ? htmlContent : selectedPage.htmlContent,
      cssContent: updateOption === 'code' ? cssContent : selectedPage.cssContent,
    };

    if (updateOption === 'file') {
      // Option to upload files
      updatedData.htmlFileName = htmlFileName;
      updatedData.cssFileName = cssFileName;
    }

    axios.put(`http://localhost:8080/api/page/${websiteId}/${selectedPage.pageName}`, updatedData)
      .then(response => {
        setPages(pages.map(page => (page.pageName === selectedPage.pageName ? response.data : page)));
        alert('Page updated successfully!');
        setShowModal(false); // Close the modal after updating
      })
      .catch(error => console.error('Error updating page:', error));
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Manage Pages</h2>
      <form onSubmit={addPage} className="mb-4">
        <div className="form-group">
          <label htmlFor="pageName">Page Name:</label>
          <input
            type="text"
            className="form-control"
            id="pageName"
            value={pageName}
            onChange={(e) => setPageName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="htmlFileName">Upload HTML File:</label>
          <input
            type="file"
            className="form-control"
            id="htmlFileName"
            accept=".html"
            onChange={handleHtmlFileChange}
            required
          />
          {htmlFileName && <p>Selected HTML File: {htmlFileName}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="cssFileName">Upload CSS File:</label>
          <input
            type="file"
            className="form-control"
            id="cssFileName"
            accept=".css"
            onChange={handleCssFileChange}
          />
          {cssFileName && <p>Selected CSS File: {cssFileName}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="htmlContent">HTML Content:</label>
          <textarea
            className="form-control"
            id="htmlContent"
            value={htmlContent}
            onChange={(e) => setHtmlContent(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="cssContent">CSS Content:</label>
          <textarea
            className="form-control"
            id="cssContent"
            value={cssContent}
            onChange={(e) => setCssContent(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary mt-3">Add Page</button>
      </form>

      <h4>Existing Pages:</h4>
      
      <ul className="list-group">
        {pages && pages.length > 0 ? (
          pages.map((page, index) => (
            <li key={index} className="list-group-item">
              <strong>{page.pageName}</strong>
              <br />
              <small>HTML File: {page.htmlFileName}</small><br />
              <small>CSS File: {page.cssFileName}</small><br />
              <button
                onClick={() => handleUpdatePage(page)}
                className="btn btn-secondary btn-sm float-right ml-2"
            >
                Update
            </button>
              <button
                onClick={() => deletePage(page.pageName)}
                className="btn btn-danger btn-sm float-right ml-2"
              >
                Delete
              </button>

            </li>
          ))
        ) : (
          <p>No pages found.</p>
        )}
      </ul>

      
    </div>
  );
};

export default ManagePages;
