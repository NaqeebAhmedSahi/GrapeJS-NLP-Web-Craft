import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null); // State for handling errors

  // Fetch users from API on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/users'); // Adjust the endpoint as needed
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Failed to fetch users.'); // Set error message
      }
    };

    fetchUsers();
  }, []);

  // Function to handle deleting a user
  const deleteUser = async (id, username) => {
    if (window.confirm(`Are you sure you want to delete user ${username}?`)) {
      try {
        await axios.delete(`http://localhost:5000/api/admin/users/${id}`); // Call the delete endpoint
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id)); // Update state to remove the deleted user
        alert(`User ${username} has been deleted.`);
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Failed to delete user.'); // Alert for delete failure
      }
    }
  };

  return (
    <div>
      <header className="bg-primary text-white text-center py-3">
        <nav>
          <Link to="/admin_dashboard" className="text-white mx-2">Dashboard</Link>
          <Link to="/users" className="text-white mx-2">Users</Link>
          <Link to="/templates" className="text-white mx-2">Templates</Link>
          <Link to="/notifications" className="text-white mx-2">Notifications</Link>
          <Link to="/view_prompts" className="text-white mx-2">View Prompts</Link>
        </nav>
      </header>

      <div className="container mt-4 mb-5">
        <h2 className="text-center mb-4">Total Users</h2>
        {error && <div className="alert alert-danger">{error}</div>} {/* Display error if exists */}
        <div className="table-responsive">
          <table className="table table-striped table-bordered text-center">
            <thead className="thead-dark">
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="3">No users found.</td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>
                      <button className="btn btn-danger btn-sm" onClick={() => deleteUser(user._id, user.username)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <footer className="footer text-center mt-auto">
        <p>&copy; 2024 GrapeJs: NLP Web Craft | All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default Users;
