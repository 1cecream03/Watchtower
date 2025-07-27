import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import api from "../api";
import { fetchMovieById } from "../services/movieapi";
import "../css/ReviewPage.css";

function ReviewPage() {
  const { id } = useParams(); // movie id
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn } = useAuth();

  const [movie, setMovie] = useState(null);
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);
  const [error, setError] = useState("");
  const [reviewId, setReviewId] = useState(null); // store review id if editing

  useEffect(() => {
    // Load movie data
    const stored = localStorage.getItem(`movie-${id}`);
    if (stored) {
      setMovie(JSON.parse(stored));
    } else {
      fetchMovieById(id)
        .then((data) => setMovie(data))
        .catch(() => setError("Movie data not found. Please go back and try again."));
    }

    // If editing, load review data from location state
    if (location.state && location.state.review) {
      const { review } = location.state;
      setContent(review.content);
      setRating(review.rating);
      setReviewId(review.id);
    }
  }, [id, location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      setError("You must be logged in to submit a review.");
      return;
    }

    if (!movie) {
      setError("Movie information missing.");
      return;
    }

    try {
      if (reviewId) {
        // Update existing review with PUT
        await api.put(`/api/reviews/${reviewId}/`, {
          movie_id: parseInt(id),
          title: movie.title,
          poster_path: movie.poster_path,
          content,
          rating,
        });
      } else {
        // Create new review with POST
        await api.post("/api/reviews/", {
          movie_id: parseInt(id),
          title: movie.title,
          poster_path: movie.poster_path,
          content,
          rating,
        });
      }

      navigate("/reviews");
    } catch (err) {
      console.error("Submit error:", err.response?.data || err);
      setError("Something went wrong. Please try again.");
    }
  };

  if (error) {
    return (
      <div className="reviewpage-container">
        <p className="error-text">{error}</p>
      </div>
    );
  }

  return (
    <div className="reviewpage-container">
      {movie?.poster_path && (
        <img
          className="review-movie-poster"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
      )}
      <h2>
        {reviewId ? "Edit Review for" : "Write a Review for"} <em>{movie?.title}</em>
      </h2>

      <form className="review-form" onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your review..."
          rows="4"
          required
        />

        <div className="star-rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={star <= rating ? "star filled" : "star"}
              onClick={() => setRating(star)}
              style={{ cursor: "pointer" }}
            >
              ★
            </span>
          ))}
        </div>

        <button type="submit">{reviewId ? "Update Review" : "Submit Review"}</button>
        {error && <p className="error-text">{error}</p>}
      </form>
    </div>
  );
}

export default ReviewPage;
