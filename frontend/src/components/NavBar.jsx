import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useMovieContext } from "../contexts/MovieContext";
import '../css/Navbar.css';

function NavBar() {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();
  const [loggingOut, setLoggingOut] = useState(false);
  const { clearFavorites } = useMovieContext();


  const handleLogout = () => {
    setLoggingOut(true);
    setTimeout(() => {
      logout();
      setLoggingOut(false);
      clearFavorites();
      navigate('/');
      window.location.reload();
    }, 1000);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">WatchTower</Link>
      </div>
      <div className="navbar-links">
        <Link to="/favorites" className="nav-link">Favorites</Link>

        {isLoggedIn ? (
          loggingOut ? (
            <span className="nav-link logout-indicator">Logging out...</span>
          ) : (
            <button onClick={handleLogout} className="nav-link logout-button">
              Logout
            </button>
          )
        ) : (
          <Link to="/login" className="nav-link">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
