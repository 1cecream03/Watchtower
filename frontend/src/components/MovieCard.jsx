import '../css/MovieCard.css';
import { useMovieContext } from '../contexts/MovieContext';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

function MovieCard({ movie }) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const favorite = isFavorite(movie.id);
  const { isLoggedIn } = useAuth();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const navigate = useNavigate();

  const handleFavoriteClick = async (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      setShowLoginPrompt(true);
      return;
    }

    if (favorite) {
      await removeFromFavorites(movie.id);
    } else {
      await addToFavorites(movie);
    }
  };

  const handleReviewClick = (e) => {
    e.preventDefault();
    localStorage.setItem(`movie-${movie.id}`, JSON.stringify(movie));
    navigate(`/movie/${movie.id}/reviews`);
  };

  return (
    <>
      <Link to={`/movie/${movie.id}`} className="movie-card-link" style={{ textDecoration: 'none' }}>
        <div className="movie-card">
          <div className="movie-poster">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            <div className="movie-overlay">
              <button
                className={`favorite-btn ${favorite ? "active" : ""}`}
                onClick={handleFavoriteClick}
              >
                ❤︎
              </button>
              <button className="review-btn" onClick={handleReviewClick}>
                🖍
              </button>
            </div>
          </div>
          <div className="movie-info">
            <h3>{movie.title}</h3>
            <p>{movie.release_date?.split("-")[0]}</p>
          </div>
        </div>
      </Link>

      {/* Simple login prompt popup */}
      {showLoginPrompt && (
        <div className="login-popup">
          <div className="popup-content">
            <p>Please log in to add movies to your favorites.</p>
            <button onClick={() => setShowLoginPrompt(false)}>Close</button>
            <Link to="/login" className="login-link">Go to Login</Link>
          </div>
        </div>
      )}
    </>
  );
}

export default MovieCard;
