import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

function ReviewPage() {
  const { id } = useParams(); // TMDB movie ID from URL
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);
  const [error, setError] = useState("");

  const movie = JSON.parse(localStorage.getItem(`movie-${id}`)); // Movie info saved in localStorage on click

  const handleSubmit = async (e) => {
    e.preventDefault();

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

      navigate("/reviews"); // Redirect to list page after submission
    } catch (err) {
      console.error("Submit error:", err.response?.data || err);
      setError("Login required to submit reviews.");
    }
  };

  return (
    <div
      style={{
        padding: "1rem",
        maxWidth: "600px",
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      {/* Movie Poster */}
      {movie?.poster_path && (
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          style={{ width: "200px", borderRadius: "12px", marginBottom: "1rem" }}
        />
      )}

      <h2>
        Write a Review for <em>{movie?.title}</em>
      </h2>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          textAlign: "left",
        }}
      >
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your review..."
          rows="4"
          required
        />
        <input
          type="number"
          value={rating}
          min="1"
          max="5"
          onChange={(e) => setRating(parseInt(e.target.value))}
        />
        <button type="submit">Submit Review</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}

export default ReviewPage;
