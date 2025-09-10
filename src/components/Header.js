import React from "react";
import "../CSS/Styles.css";
import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="header">
      <Link to="/" className="logo-link">
        <div className="header-logo">
          <i className="fas fa-coins" style={{ marginRight: "8px" }}></i>
          Cryptocurrency List
        </div>
      </Link>
      <div className="header-nav">
        <Link to="/watchlist" className="nav-link">
          <i className="fas fa-heart" style={{ marginRight: "5px" }}></i>
          My Watching List
        </Link>
      </div>
      <div className="header-actions">
        <button 
          onClick={toggleTheme} 
          className="theme-toggle"
          title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
        >
          {isDarkMode ? (
            <>
              <i className="fas fa-sun"></i>
              Light
            </>
          ) : (
            <>
              <i className="fas fa-moon"></i>
              Dark
            </>
          )}
        </button>
        <Link to="/register" className="action-link">
          <i className="fas fa-user-plus" style={{ marginRight: "5px" }}></i>
          Register
        </Link>
        <Link to="/login" className="action-link">
          <i className="fas fa-sign-in-alt" style={{ marginRight: "5px" }}></i>
          Login
        </Link>
      </div>
    </div>
  );
};

export default Header;
