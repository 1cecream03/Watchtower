import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import { useAuth } from "../contexts/AuthContext";
import "../css/MovieCard.css";

function MovieCard({ movie }) {
  const { isLoggedIn } = useAuth();
  const [isFav, setIsFav] = useState(false);
  const [favoriteId, setFavoriteId] = useState(null);

  useEffect(() => {
    const checkFavorite = async () => {
      if (!isLoggedIn) return;

      try {
        const res = await api.get("/api/favorites/");
        const found = res.data.find((fav) => fav.movie_id === movie.id);
        if (found) {
          setIsFav(true);
          setFavoriteId(found.id);
        }
      } catch (err) {
        console.error("Failed to check favorite:", err);
      }
    };

    checkFavorite();
  }, [isLoggedIn, movie.id]);

  const toggleFavorite = async () => {
    if (!isLoggedIn) {
      alert("Please log in to favorite movies.");
      return;
    }

    try {
      if (isFav) {
        await api.delete(`/api/favorites/${favoriteId}/`);
        setIsFav(false);
        setFavoriteId(null);
      } else {
        const res = await api.post("/api/favorites/", {
          movie_id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
          release_date: movie.release_date,
        });
        setIsFav(true);
        setFavoriteId(res.data.id);
      }
    } catch (err) {
      console.error("Failed to toggle favorite:", err);
    }
  };

  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.id}`}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="movie-poster"
        />
      </Link>
      <div className="movie-details">
        <Link to={`/movie/${movie.id}`} className="movie-title-link">
          <h3>{movie.title}</h3>
        </Link>
        <p>{movie.release_date}</p>

        <div className="movie-actions">
          <button className="favorite-btn" onClick={toggleFavorite}>
            {isFav ? "❤️" : "🤍"}
          </button>

          <Link to={`/movie/${movie.id}/reviews`} className="review-btn">
            Review
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
