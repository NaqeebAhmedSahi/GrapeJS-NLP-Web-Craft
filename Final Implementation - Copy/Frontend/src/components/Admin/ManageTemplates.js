import React, { useState } from 'react';
// Import Link from react-router-dom
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminHeader from './AdminHeader';
import '../../styles/Admin/templates.css';

const ManageTemplates = () => {
  // Sample template data stored in state (could be replaced with data from API)
  const [templates, setTemplates] = useState([
    { id: 1, name: 'ecommerce_template.zip' },
    { id: 2, name: 'blog_template.zip' },
  ]);

  // Function to handle adding a template
  const addTemplate = (event) => {
    event.preventDefault();
    const templateFile = event.target.templateZip.files[0];
    if (templateFile) {
      const newTemplate = { id: templates.length + 1, name: templateFile.name };
      setTemplates([...templates, newTemplate]); // Add the new template to the state
      alert(`Template ${templateFile.name} added successfully!`);
      event.target.reset(); // Clear the form
    }
  };

  // Function to handle deleting a template
  const deleteTemplate = (id) => {
    if (window.confirm('Are you sure you want to delete this template?')) {
      setTemplates(templates.filter((template) => template.id !== id));
      alert('Template has been deleted.');
    }
  };

  return (
    <div className='manage'>
      {/* Header Section with Navigation */}
      <AdminHeader/>

      {/* Templates Management Container */}
      <div className="container mt-4 mb-5">
        <h2 className="text-center mb-4">Manage Templates</h2>

        {/* Add Template Form */}
        <form id="addTemplateForm" onSubmit={addTemplate} className="mb-4">
          <div className="form-group">
            <label htmlFor="templateZip">Upload Template (ZIP File):</label>
            <input type="file" className="form-control-file" id="templateZip" accept=".zip" required />
          </div>
          <button type="submit" className="btn btn-success">Add Template</button>
        </form>

        {/* Templates Table */}
        <div className="table-responsive">
          <table className="table table-striped table-bordered text-center">
            <thead className="thead-dark">
              <tr>
                <th>Template Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="templateTableBody">
              {templates.map((template) => (
                <tr key={template.id}>
                  <td>{template.name}</td>
                  <td>
                    <button className="btn btn-danger btn-sm" onClick={() => deleteTemplate(template.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="footer text-center mt-auto">
        <p>&copy; 2024 GrapeJs: NLP Web Craft | All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default ManageTemplates;
