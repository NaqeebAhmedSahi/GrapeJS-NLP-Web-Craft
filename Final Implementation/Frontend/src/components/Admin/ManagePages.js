import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ManagePages = () => {
  const { websiteId } = useParams();
  const [pages, setPages] = useState([]);
  const [pageName, setPageName] = useState('');
  const [htmlFileName, setHtmlFileName] = useState('');
  const [htmlContent, setHtmlContent] = useState('');
  const [cssFileName, setCssFileName] = useState('');
  const [cssContent, setCssContent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/page/${websiteId}`)
      .then(response => setPages(response.data || []))
      .catch(error => console.error('Error fetching pages:', error));
  }, [websiteId]);

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
    axios
      .post(`http://localhost:8080/api/page/${websiteId}`, {
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
      axios
        .delete(`http://localhost:8080/api/page/${websiteId}/${pageName}`)
        .then(() => {
          setPages(pages.filter(page => page.pageName !== pageName));
          alert('Page deleted successfully');
        })
        .catch(error => console.error('Error deleting page:', error));
    }
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
          <small className="text-muted">Accepted format: .html</small>
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
          <small className="text-muted">Accepted format: .css</small>
        </div>

        <div className="form-group">
          <label htmlFor="htmlContent">HTML Content:</label>
          <textarea
            className="form-control"
            id="htmlContent"
            rows="8"
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
            rows="8"
            value={cssContent}
            onChange={(e) => setCssContent(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary mt-3">Add Page</button>
      </form>

      <h4 className="mt-5">Existing Pages:</h4>
      {pages && pages.length > 0 ? (
        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th>#</th>
              <th>Page Name</th>
              <th>HTML File</th>
              <th>CSS File</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pages.map((page, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{page.pageName}</td>
                <td>{page.htmlFileName || 'N/A'}</td>
                <td>{page.cssFileName || 'N/A'}</td>
                <td>
                  <button
                    className="btn btn-secondary btn-sm mr-2"
                    onClick={() => navigate(`/updatePage/${websiteId}/${page.pageName}`)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deletePage(page.pageName)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-muted mt-3">No pages found.</p>
      )}
    </div>
  );
};

export default ManagePages;
