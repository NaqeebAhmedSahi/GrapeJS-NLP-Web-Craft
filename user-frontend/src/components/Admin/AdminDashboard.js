import React from 'react';
import '../../styles/Admin/dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div>
      {/* Header Section with Navigation */}
      <header className="bg-primary text-white text-center py-3">
            {/* <img src="logo.png" alt="GrapeJs: NLP Web Craft" className="logo mb-2" />
        <h1>GrapeJs: NLP Web Craft</h1> */}
            <nav>
                <Link to="/admin_dashboard" className="text-white mx-2">Dashboard</Link>
                <Link to="/users" className="text-white mx-2">Users</Link>
                <Link to="/templates" className="text-white mx-2">Templates</Link>
                <Link to="/notifications" className="text-white mx-2">Notifications</Link>
                <Link to="/view_prompts" className="text-white mx-2">View Prompts</Link>
            </nav>
        </header>
      {/* Dashboard Container */}
      <div className="container mt-4 mb-5">
        <h2 className="text-center mb-4">Admin Dashboard</h2>

        <div className="row">
          {/* Users Card */}
          <div className="col-lg-3 col-md-6 mb-4">
            <div className="card dashboard-card">
              <div className="card-body text-center">
                <h5 className="card-title">Total Users</h5>
                <h2 className="card-number">150</h2>
                <p className="card-text">Number of registered users on the platform.</p>
                <Link to="/users" className="btn btn-primary">View Users</Link>
              </div>
            </div>
          </div>

          {/* Templates Card */}
          <div className="col-lg-3 col-md-6 mb-4">
            <div className="card dashboard-card">
              <div className="card-body text-center">
                <h5 className="card-title">Total Templates</h5>
                <h2 className="card-number">25</h2>
                <p className="card-text">Templates available for e-commerce, blogs, and portfolios.</p>
                <Link to="/templates" className="btn btn-primary">View Templates</Link>
              </div>
            </div>
          </div>

          {/* Notifications Card */}
          <div className="col-lg-3 col-md-6 mb-4">
            <div className="card dashboard-card">
              <div className="card-body text-center">
                <h5 className="card-title">Notifications</h5>
                <h2 className="card-number">5</h2>
                <p className="card-text">New notifications from users and system alerts.</p>
                <Link to="/notifications" className="btn btn-primary">View Notifications</Link>
              </div>
            </div>
          </div>

          {/* Prompt History Card */}
          <div className="col-lg-3 col-md-6 mb-4">
            <div className="card dashboard-card">
              <div className="card-body text-center">
                <h5 className="card-title">Prompt History</h5>
                <h2 className="card-number">30</h2>
                <p className="card-text">Historical prompts generated for website creation.</p>
                <Link to="/prompt_history" className="btn btn-primary">View History</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="footer text-center mt-auto">
        <p>&copy; 2024 GrapeJs: NLP Web Craft | All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default AdminDashboard;
