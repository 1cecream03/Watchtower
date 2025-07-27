import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useMovieContext } from '../contexts/MovieContext';
import { getGenres } from '../services/movieapi';
import '../css/Navbar.css';

function NavBar() {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();
  const { clearFavorites } = useMovieContext();
  const [loggingOut, setLoggingOut] = useState(false);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    getGenres().then(setGenres);
  }, []);

  const handleLogout = () => {
    setLoggingOut(true);
    setTimeout(() => {
      logout();
      clearFavorites();
      setLoggingOut(false);
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
        <div className="dropdown">
          <span className="nav-link">Genres ▼</span>
          <div className="dropdown-content genre-scroll">
            {genres.map((genre) => (
              <Link
                key={genre.id}
                to={`/genre/${genre.id}`}
                className="dropdown-item"
              >
                {genre.name}
              </Link>
            ))}
          </div>
        </div>

        <Link to="/reviews" className="nav-link">Reviews</Link>
        <Link to="/favorites" className="nav-link">Favorites</Link>
        
        {/* New recommender button */}
        <Link to="/recommendations" className="nav-link">Recommender</Link>

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
