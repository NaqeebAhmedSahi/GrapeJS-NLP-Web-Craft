import { Link } from 'react-router-dom';
import '../../styles/Admin/dashboard.css';
const AdminHeader = () => {
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
                  <Link to="/super_admin" className="text-white mx-2">Super Admin approval</Link>

                  
              </nav>
          </header>
          </div>)};

export default AdminHeader;