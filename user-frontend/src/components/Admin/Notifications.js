import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Admin/notifications.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'; // Ensure axios is installed

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null); // State for handling errors

  // Fetch notifications from API on component mount
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/notifications'); // Adjust the endpoint as needed
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
        setError('Failed to fetch notifications.'); // Set error message
      }
    };

    fetchNotifications();
  }, []);

  // Handle deleting a notification
  const deleteNotification = async (id) => {
    if (window.confirm(`Are you sure you want to delete this notification?`)) {
      try {
        await axios.delete(`http://localhost:5000/api/admin/notifications/${id}`); // Call the delete endpoint
        setNotifications(notifications.filter((notification) => notification._id !== id)); // Update state to remove the deleted notification
        alert('Notification has been deleted.');
      } catch (error) {
        console.error('Error deleting notification:', error);
        alert('Failed to delete notification.'); // Alert for delete failure
      }
    }
  };

  // Handle responding to a notification
  const respondToNotification = async (name) => {
    const message = window.prompt(`Enter your response to ${name}:`);
    if (message) {
      // Here you can send the response to the server
      alert(`Response sent to ${name}: "${message}"`);
      // You can implement sending the message to the server if needed
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
        <h2 className="text-center mb-4">Notifications</h2>
        {error && <div className="alert alert-danger">{error}</div>} {/* Display error if exists */}
        <div className="table-responsive">
          <table className="table table-striped table-bordered text-center">
            <thead className="thead-dark">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {notifications.length === 0 ? (
                <tr>
                  <td colSpan="4">No notifications found.</td>
                </tr>
              ) : (
                notifications.map((notification) => (
                  <tr key={notification._id}>
                    <td>{notification.name}</td>
                    <td>{notification.email}</td>
                    <td>{notification.message}</td>
                    <td>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => respondToNotification(notification.name)}
                      >
                        Respond
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteNotification(notification._id)}
                      >
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

export default Notifications;
