import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import api from "../api";
import "../css/ReviewPage.css";

function ReviewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);
  const [error, setError] = useState("");
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem(`movie-${id}`);
    if (stored) {
      setMovie(JSON.parse(stored));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      setError("Login required to submit reviews.");
      return;
    }

    if (!movie) {
      setError("Movie data not found.");
      return;
    }

    try {
      await api.post("/api/reviews/", {
        movie_id: parseInt(id),
        title: movie.title,
        poster_path: movie.poster_path,
        content,
        rating,
      });

      setContent("");
      setRating(5);
      setError("");
      navigate("/reviews");
    } catch (err) {
      console.error("Submit error:", err.response?.data || err);
      setError("An error occurred. Try again.");
    }
  };

  const handleStarClick = (index) => {
    setRating(index + 1);
  };

  if (!movie) {
    return (
      <div className="review-container">
        <p className="error-text">Movie data not found. Please go back and try again.</p>
      </div>
    );
  }

  return (
    <div className="review-container">
      {movie.poster_path && (
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="review-poster"
        />
      )}

      <h2 className="review-heading">
        Write a Review for <em>{movie.title}</em>
      </h2>

      <form onSubmit={handleSubmit} className="review-form">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your review..."
          rows="5"
          required
          className="review-textarea"
        />

        <div className="star-rating">
          {[...Array(5)].map((_, index) => (
            <span
              key={index}
              className={`star ${index < rating ? "filled" : ""}`}
              onClick={() => handleStarClick(index)}
            >
              ★
            </span>
          ))}
        </div>

        <button type="submit" className="submit-button">
          Submit Review
        </button>

        {error && <p className="error-text">{error}</p>}
      </form>
    </div>
  );
}

export default ReviewPage;
