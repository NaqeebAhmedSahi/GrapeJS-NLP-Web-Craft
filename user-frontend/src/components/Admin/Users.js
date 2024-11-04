import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import 'bootstrap/dist/css/bootstrap.min.css';

const Users = () => {
  // Sample user data stored in state (replace with API data)
  const [users, setUsers] = useState([
    { id: 1, username: 'john_doe', email: 'john@example.com', password: '***encrypted_password1***' },
    { id: 2, username: 'jane_smith', email: 'jane@example.com', password: '***encrypted_password2***' },
    { id: 3, username: 'mike_brown', email: 'mike@example.com', password: '***encrypted_password3***' },
  ]);

  // Function to handle deleting a user
  const deleteUser = (username) => {
    if (window.confirm(`Are you sure you want to delete user ${username}?`)) {
      setUsers(users.filter((user) => user.username !== username));
      alert(`User ${username} has been deleted.`);
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

      {/* Users Table Container */}
      <div className="container mt-4 mb-5">
        <h2 className="text-center mb-4">Total Users</h2>

        <div className="table-responsive">
          <table className="table table-striped table-bordered text-center">
            <thead className="thead-dark">
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Encrypted Password</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                  <td>
                    <button className="btn btn-danger btn-sm" onClick={() => deleteUser(user.username)}>
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

export default Users;
