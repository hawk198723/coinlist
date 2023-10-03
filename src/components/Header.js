import React from "react";
import "../CSS/Styles.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <Link to="/" className="logo-link">
        <div className="header-logo">Cryptocurrency List</div>
      </Link>
      <div className="header-nav">
        <Link to="/watchlist" className="nav-link">
          My Watching List
        </Link>
      </div>
      <div className="header-actions">
        <Link to="/register" className="action-link">
          Register
        </Link>
        <Link to="/login" className="action-link">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Header;
