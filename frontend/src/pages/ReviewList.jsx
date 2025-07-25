import { useEffect, useState } from "react";
import api from "../api";
import { useAuth } from "../contexts/AuthContext";
import "../css/ReviewList.css";

function ReviewList() {
  const [reviews, setReviews] = useState([]);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await api.get("/api/reviews/");
        setReviews(res.data);
      } catch (err) {
        console.error("Failed to load reviews:", err);
      }
    };

    if (isLoggedIn) {
      fetchReviews();
    } else {
      setReviews([]);
    }
  }, [isLoggedIn]);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/reviews/${id}/`);
      setReviews((prev) => prev.filter((review) => review.id !== id));
    } catch (err) {
      console.error("Failed to delete review:", err);
      alert("Failed to delete review.");
    }
  };

  return (
    <div className="reviewlist-page">
      <h2>Your Reviews</h2>

      <div className="reviews-grid">
        {reviews.map((review) => (
          <div className="review-card" key={review.id}>
            <div className="movie-poster">
              <img
                src={`https://image.tmdb.org/t/p/w500${review.poster_path}`}
                alt={review.title}
              />
            </div>
            <div className="movie-info">
              <h3>{review.title}</h3>
              <div className="stars">{"⭐".repeat(review.rating)}</div>
              <p className="review-text">{review.content}</p>
              <button
                className="delete-btn"
                onClick={() => handleDelete(review.id)}
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      {reviews.length === 0 && (
        <p style={{ textAlign: "center", marginTop: "2rem" }}>
          You haven’t written any reviews yet.
        </p>
      )}
    </div>
  );
}

export default ReviewList;
