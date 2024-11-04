import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import 'bootstrap/dist/css/bootstrap.min.css';

const ViewPrompts = () => {
  // Sample prompts data stored in state (replace with API data)
  const [prompts, setPrompts] = useState([
    { id: 1, prompt: 'Create a blog about healthy eating.', createdBy: 'John Doe', createdAt: '2024-09-20 10:15' },
    { id: 2, prompt: 'Design an e-commerce website for shoes.', createdBy: 'Jane Smith', createdAt: '2024-09-21 14:30' },
    // Add more prompts as needed
  ]);

  // Function to handle deleting a prompt
  const deletePrompt = (id) => {
    if (window.confirm(`Are you sure you want to delete the prompt with ID ${id}?`)) {
      setPrompts(prompts.filter((prompt) => prompt.id !== id));
      alert(`Prompt with ID ${id} has been deleted.`);
    }
  };

  return (
    <div>
      {/* Header Section with Navigation */}
      <header className="bg-primary text-white text-center py-3">
        <nav>
          <Link to="/admin_dashboard" className="text-white mx-2">Dashboard</Link>
          <Link to="/users" className="text-white mx-2">Users</Link>
          <Link to="/templates" className="text-white mx-2">Templates</Link>
          <Link to="/notifications" className="text-white mx-2">Notifications</Link>
          <Link to="/view_prompts" className="text-white mx-2">View Prompts</Link>
        </nav>
      </header>

      {/* Prompts Table Container */}
      <div className="container mt-4 mb-5">
        <h2 className="text-center mb-4">View All Prompts</h2>

        <div className="table-responsive">
          <table className="table table-striped table-bordered text-center">
            <thead className="thead-dark">
              <tr>
                <th>ID</th>
                <th>Prompt</th>
                <th>Created By</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {prompts.map((prompt) => (
                <tr key={prompt.id}>
                  <td>{prompt.id}</td>
                  <td>{prompt.prompt}</td>
                  <td>{prompt.createdBy}</td>
                  <td>{prompt.createdAt}</td>
                  <td>
                    <button className="btn btn-danger btn-sm" onClick={() => deletePrompt(prompt.id)}>
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

export default ViewPrompts;
