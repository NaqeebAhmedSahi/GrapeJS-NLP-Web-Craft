import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/Admin/superAdmin.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminHeader from './AdminHeader';

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

  if (!isSuperAdmin) {
    return (
      <div className="container access-denied">
        <div className="access-denied-message text-center">
          <h1 className="display-4 text-white">Access Denied</h1>
          <p className="lead text-white">This page is restricted to Super Admins only.</p>
          <p className="text-primary">Please contact an administrator if you believe you should have access.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <AdminHeader />
      
      <div className="container main-content">
        <header className="text-center my-4">
          <h1 className="display-4 text-primary">Super Admin Dashboard</h1>
          <p className="text-muted">Manage admin approval requests</p>
        </header>

        {error && <p className="text-danger text-center">{error}</p>}

        <div className="row">
          {adminRequests.length === 0 ? (
            <p className="text-center w-100">No pending admin requests.</p>
          ) : (
            adminRequests.map((request) => (
              <div className="col-md-4 col-sm-6 mb-4" key={request._id}>
                <div className="card shadow-sm rounded-lg">
                  <div className="card-body">
                    <h5 className="card-title text-primary">{request.userName}</h5>
                    <p className="card-text"><strong>Email:</strong> {request.email}</p>
                    <div className="d-flex justify-content-between">
                      <button 
                        className="btn btn-success btn-button rounded-circle btn-shadow" 
                        onClick={() => handleApproval(request._id)}
                      >
                        Approve
                      </button>
                      <button 
                        className="btn btn-danger btn-button rounded-circle btn-shadow" 
                        onClick={() => handleDeletion(request._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
      </div>
      <footer className="footer text-center">
        <p>&copy; 2024 GrapeJs: NLP Web Craft | All Rights Reserved</p>
      </footer>
    </>
  );
};

export default SuperAdminPage;
