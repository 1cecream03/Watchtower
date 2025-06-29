import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../css/Navbar.css';

function NavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("REFRESH_TOKEN");
    localStorage.removeItem("username");
    navigate("/");
    // no need to set state because isLoggedIn derived from localStorage
  };

  const token = localStorage.getItem("ACCESS_TOKEN");
  const isLoggedIn = !!token;

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">WatchTower</Link>
      </div>
      <div className="navbar-links">
        <Link to="/favorites" className="nav-link">Favorites</Link>
        {isLoggedIn ? (
          <button onClick={handleLogout} className="nav-link logout-button">
            Logout
          </button>
        ) : (
          <Link to="/login" className="nav-link">Login</Link>
        )}
      </div>
    </nav>
  );
}


export default NavBar;
