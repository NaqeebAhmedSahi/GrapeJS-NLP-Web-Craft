import React, { useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdatePage = () => {
  const { websiteId, pageName } = useParams();
  const { state: page } = useLocation(); // Get the passed page data
  const [htmlContent, setHtmlContent] = useState(page.htmlContent);
  const [cssContent, setCssContent] = useState(page.cssContent);
  const [htmlFileName, setHtmlFileName] = useState('');
  const [cssFileName, setCssFileName] = useState('');
  const [updateOption, setUpdateOption] = useState('code');
  const navigate = useNavigate();

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

  const handleUpdate = (event) => {
    event.preventDefault();

    const updatedData = {
      htmlContent: updateOption === 'code' ? htmlContent : page.htmlContent,
      cssContent: updateOption === 'code' ? cssContent : page.cssContent,
    };

    if (updateOption === 'file') {
      updatedData.htmlFileName = htmlFileName;
      updatedData.cssFileName = cssFileName;
    }

    axios.put(`http://localhost:8080/api/page/${websiteId}/${pageName}`, updatedData)
      .then(() => {
        alert('Page updated successfully!');
        navigate(`/manage-pages/${websiteId}`);
      })
      .catch(error => console.error('Error updating page:', error));
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Update Page: {pageName}</h2>

      {/* Radio buttons to choose update option */}
      <div className="form-check mb-4">
        <input
          className="form-check-input"
          type="radio"
          name="updateOption"
          id="updateOptionCode"
          value="code"
          checked={updateOption === 'code'}
          onChange={() => setUpdateOption('code')}
        />
        <label className="form-check-label" htmlFor="updateOptionCode">
          Edit HTML/CSS Code
        </label>
      </div>
      <div className="form-check mb-4">
        <input
          className="form-check-input"
          type="radio"
          name="updateOption"
          id="updateOptionFile"
          value="file"
          checked={updateOption === 'file'}
          onChange={() => setUpdateOption('file')}
        />
        <label className="form-check-label" htmlFor="updateOptionFile">
          Upload New Files (HTML/CSS)
        </label>
      </div>

      {/* Display code editors if 'Edit Code' option is selected */}
      {updateOption === 'code' && (
        <>
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
        </>
      )}

      {/* Display file upload inputs if 'Upload Files' option is selected */}
      {updateOption === 'file' && (
        <>
          <div className="form-group">
            <label htmlFor="htmlFileName">Upload HTML File:</label>
            <input
              type="file"
              className="form-control"
              id="htmlFileName"
              accept=".html"
              onChange={handleHtmlFileChange}
            />
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
          </div>
        </>
      )}

      <button type="submit" className="btn btn-primary mt-3" onClick={handleUpdate}>Update Page</button>
    </div>
  );
};

export default UpdatePage;
