import React, { useEffect, useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import AdminHeader from './AdminHeader';
import '../../styles/Admin/users.css'

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null); // State for handling errors

  // Fetch users from API on component mount
  useEffect(() => {
    let isMounted = true; // Track if the component is still mounted
  
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/admin/users'); // Adjust the endpoint as needed
        console.log('API Response:', response.data); // Log the response to see its structure
  
        if (isMounted) {
          // Check if response.data is an array
          if (Array.isArray(response.data)) {
            setUsers(response.data);
          } else {
            setError('Unexpected response format.'); // Set error if response is not an array
          }
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        if (isMounted) {
          setError('Failed to fetch users.'); // Set error message
        }
      }
    };
  
    fetchUsers();
  
    // Cleanup function to prevent state update on unmounted component
    return () => {
      isMounted = false;
    };
  }, []);
  

  // Function to handle deleting a user
  const deleteUser = async (id, username) => {
    if (window.confirm(`Are you sure you want to delete user ${username}?`)) {
      try {
        await axios.delete(`http://localhost:8080/api/admin/users/${id}`); // Call the delete endpoint
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
      <div className='Users'>
      <AdminHeader/>
      
        <div className="container my-5 mb-5">
          <h2 className="text-center mb-4">Total Users</h2>
          {error && <div className="alert alert-danger">{error}</div>} {/* Display error if exists */}
          <div className="table-responsive">
            <table className="table table-striped table-bordered text-center">
              <thead className="thead-dark">
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Password</th>
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
                      <td>{user.password.length > 10 ? user.password.slice(0, 10) + '...' : user.password}</td>
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
    </div>
  );
};

export default Users;
