import { useEffect, useState } from "react";
import api from "../api";
import { useAuth } from "../contexts/AuthContext";
import "../css/Home.css";

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

  return (
    <div className="home">
      <h2 style={{ marginBottom: "1rem" }}>Your Reviews</h2>

      <div className="movies-grid">
        {reviews.map((review) => (
          <div className="movie-card" key={review.id}>
            <div className="movie-poster">
              <img
                src={`https://image.tmdb.org/t/p/w500${review.poster_path}`}
                alt={review.title}
              />
            </div>
            <div className="movie-info">
              <h3>{review.title}</h3>
              <div style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>
                {"⭐".repeat(review.rating)}
              </div>
              <p
                style={{
                  maxHeight: "4.5em",
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {review.content}
              </p>
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
