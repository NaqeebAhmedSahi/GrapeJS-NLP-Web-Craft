import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/Admin/notifications.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminHeader from './AdminHeader';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null); // State for handling errors
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [currentNotificationId, setCurrentNotificationId] = useState(null); // Store current notification ID
  const [response, setResponse] = useState(''); // Response input state

  // Fetch notifications from API on component mount
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/admin/contacts'); // Adjusted endpoint for contacts
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
        setError('Failed to fetch notifications.');
      }
    };

    fetchNotifications();
  }, []);

  // Handle deleting a notification (contact message)
  const deleteNotification = async (id) => {
    if (window.confirm(`Are you sure you want to delete this notification?`)) {
      try {
        await axios.delete(`http://localhost:8080/api/admin/contacts/${id}`);
        setNotifications(notifications.filter((notification) => notification._id !== id)); // Update state to remove the deleted notification
        alert('Notification has been deleted.');
      } catch (error) {
        console.error('Error deleting notification:', error);
        alert('Failed to delete notification.');
      }
    }
  };

  // Open the response modal and set the current notification ID
  const openResponseModal = (id) => {
    setCurrentNotificationId(id);
    setShowModal(true);
  };

  // Handle responding to a notification (contact message)
  const handleResponse = async () => {
    if (response.trim()) {
      try {
        // Send the response to the backend
        await axios.post(`http://localhost:8080/api/admin/respond/${currentNotificationId}`, { response });
        alert(`Response sent: "${response}"`);

        // Close the modal and reset the response state
        setShowModal(false);
        setResponse('');
      } catch (error) {
        console.error('Error responding to notification:', error);
        alert('Failed to send response.');
      }
    } else {
      alert('Response cannot be empty.');
    }
  };

  return (
    <div className='notification'>
      <AdminHeader />

      <div className="container mt-4 mb-5">
        <h2 className="text-center mb-4">Notifications</h2>
        {error && <div className="alert alert-danger">{error}</div>}
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
                        onClick={() => openResponseModal(notification._id)} // Pass the ID for response
                      >
                        Respond
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteNotification(notification._id)} // Pass the ID for deletion
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

      {/* Bootstrap Modal for Responding */}
      {showModal && (
        <div
          className="modal fade show"
          id="responseModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="responseModalLabel"
          style={{ display: 'block', paddingRight: '17px' }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="responseModalLabel">Respond to Notification</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setShowModal(false)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <textarea
                  className="form-control"
                  rows="4"
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                  placeholder="Enter your response here"
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleResponse}
                >
                  Send Response
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="footer text-center mt-auto">
        <p>&copy; 2024 GrapeJs: NLP Web Craft | All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default Notifications;
