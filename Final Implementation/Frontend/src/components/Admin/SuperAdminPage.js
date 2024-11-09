import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/Admin/superAdmin.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const SuperAdminPage = ({ isSuperAdmin }) => {
  const [adminRequests, setAdminRequests] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isSuperAdmin) {
      setError("Access denied. Super admin privileges required.");
      return;
    }
    
    // Fetch pending admin requests
    axios.get('http://localhost:8080/api/admin/pending-requests')
      .then(response => setAdminRequests(response.data))
      .catch(err => setError("Failed to load requests."));
  }, [isSuperAdmin]);

  const handleApproval = (id) => {
    axios.put(`http://localhost:8080/api/admin/approve/${id}`)
      .then(() => setAdminRequests(adminRequests.filter(request => request._id !== id)))
      .catch(err => setError("Failed to approve request."));
  };

  const handleDeletion = (id) => {
    axios.delete(`http://localhost:8080/api/admin/delete/${id}`)
      .then(() => setAdminRequests(adminRequests.filter(request => request._id !== id)))
      .catch(err => setError("Failed to delete request."));
  };

  return (
    <div className="container my-5">
      <header className="text-center my-4">
        <h1>Super Admin Dashboard</h1>
        <p className="text-muted">Manage admin approval requests</p>
      </header>

      {error && <p className="text-danger text-center">{error}</p>}

      <div className="row">
        {adminRequests.length === 0 ? (
          <p className="text-center w-100">No pending admin requests.</p>
        ) : (
          adminRequests.map((request) => (
            <div className="col-md-6" key={request._id}>
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">{request.userName}</h5>
                  <p className="card-text"><strong>Email:</strong> {request.email}</p>
                  <button 
                    className="btn btn-success mr-2" 
                    onClick={() => handleApproval(request._id)}
                  >
                    Approve
                  </button>
                  <button 
                    className="btn btn-danger" 
                    onClick={() => handleDeletion(request._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SuperAdminPage;
