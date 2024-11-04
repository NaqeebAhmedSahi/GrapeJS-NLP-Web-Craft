import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Admin/notifications.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Notifications = () => {
  // Sample notifications data, you can replace this with dynamic data from an API
  const [notifications, setNotifications] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', message: 'Interested in your services!' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', message: 'Could you provide more details?' },
  ]);

  // Handle deleting a notification
  const deleteNotification = (id) => {
    if (window.confirm(`Are you sure you want to delete this notification?`)) {
      setNotifications(notifications.filter((notification) => notification.id !== id));
      alert('Notification has been deleted.');
    }
  };

  // Handle responding to a notification
  const respondToNotification = (name) => {
    const message = window.prompt(`Enter your response to ${name}:`);
    if (message) {
      // Add response logic here, like sending the message to the server
      alert(`Response sent to ${name}: "${message}"`);
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

      {/* Notifications Table Container */}
      <div className="container mt-4 mb-5">
        <h2 className="text-center mb-4">Notifications</h2>
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
              {notifications.map((notification) => (
                <tr key={notification.id}>
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
                      onClick={() => deleteNotification(notification.id)}
                    >
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

export default Notifications;
