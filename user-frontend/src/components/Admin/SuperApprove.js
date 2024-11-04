import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SuperAdminPage = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Fetch all admin requests where response is false
    axios.get('/api/admin/requests')
      .then(response => setRequests(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleApprove = (id) => {
    axios.post(`/api/admin/approve/${id}`)
      .then(() => {
        setRequests(prev => prev.filter(request => request._id !== id));
      })
      .catch(error => console.error(error));
  };

  const handleDelete = (id) => {
    axios.delete(`/api/admin/delete/${id}`)
      .then(() => {
        setRequests(prev => prev.filter(request => request._id !== id));
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h2>Admin Requests</h2>
      <ul>
        {requests.map(request => (
          <li key={request._id}>
            {request.userName} - {request.email}
            <button onClick={() => handleApprove(request._id)}>Approve</button>
            <button onClick={() => handleDelete(request._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SuperAdminPage;
