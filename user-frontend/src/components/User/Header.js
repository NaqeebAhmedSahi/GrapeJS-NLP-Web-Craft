// Header Component
import { IonIcon } from "@ionic/react";
import { logoWebComponent } from "ionicons/icons";
import { Link } from "react-router-dom"; 
const Header = () => {
    return (
      <header className="home-header">
        <Link to="/" className="logo">
          <IonIcon icon={logoWebComponent} /> 
        </Link>
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/features">Features</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/admin_dashboard">Admin</Link>

        </nav>
      </header>
    );
  };

  export default Header;