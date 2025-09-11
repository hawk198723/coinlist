import React, { useState, useRef, useEffect } from "react";
import "../CSS/Styles.css";
import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";

const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { currentUser, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef(null);

  // 点击外部关闭菜单
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setShowUserMenu(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const getInitials = (displayName, email) => {
    if (displayName) {
      return displayName.split(' ').map(name => name[0]).join('').toUpperCase().slice(0, 2);
    }
    return email ? email[0].toUpperCase() : 'U';
  };

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
        <Link to="/alerts" className="nav-link">
          <i className="fas fa-bell" style={{ marginRight: "5px" }}></i>
          Price Alerts
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
        
        {currentUser ? (
          <div className="user-menu" ref={menuRef}>
            <button
              className="user-menu-trigger"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <div className="user-avatar">
                {getInitials(currentUser.displayName, currentUser.email)}
              </div>
              <span>{currentUser.displayName || currentUser.email}</span>
              <i className={`fas fa-chevron-${showUserMenu ? 'up' : 'down'}`}></i>
            </button>
            
            {showUserMenu && (
              <div className="user-menu-dropdown">
                <Link to="/profile" className="user-menu-item" onClick={() => setShowUserMenu(false)}>
                  <i className="fas fa-user"></i>
                  My Profile
                </Link>
                <Link to="/settings" className="user-menu-item" onClick={() => setShowUserMenu(false)}>
                  <i className="fas fa-cog"></i>
                  Settings
                </Link>
                <button className="user-menu-item" onClick={handleLogout}>
                  <i className="fas fa-sign-out-alt"></i>
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/register" className="action-link">
              <i className="fas fa-user-plus" style={{ marginRight: "5px" }}></i>
              Register
            </Link>
            <Link to="/login" className="action-link">
              <i className="fas fa-sign-in-alt" style={{ marginRight: "5px" }}></i>
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
