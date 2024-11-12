import { useState } from "react";
import { IonIcon } from "@ionic/react";
import { logoWebComponent } from "ionicons/icons";
import { Link } from "react-router-dom";
import "../../styles/User/loginPage.css";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
      <header className="home-header">
        <Link to="/" className="logo">
          <IonIcon icon={logoWebComponent} /> 
          <span>Grapes: NLP Web Craft</span>
        </Link>
        <button className="hamburger" onClick={toggleMenu}>
          ☰
        </button>
        <div className={`mobile-nav ${menuOpen ? "show" : ""} nav-header`}>
          <Link to="/">Home</Link>
          <Link to="/features">Features</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/admin_dashboard">Admin</Link>
        </div>
      </header>
    );
};

export default Header;
