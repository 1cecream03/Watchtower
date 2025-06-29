import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

function ReviewPage() {
  const { id } = useParams(); // TMDB movie ID from URL
  const [reviews, setReviews] = useState([]);
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);
  const [error, setError] = useState("");

  const movie = JSON.parse(localStorage.getItem(`movie-${id}`)); // grab stored movie

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await api.get("/api/reviews/");
        setReviews(res.data.filter(r => r.movie_id === parseInt(id)));
      } catch (err) {
        console.error(err);
      }
    };
    fetchReviews();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/reviews/", {
        movie_id: id,
        title: movie.title,
        poster_path: movie.poster_path,
        content,
        rating,
      });
      setContent("");
      setRating(5);
      setError("");
      // Refresh
      const res = await api.get("/api/reviews/");
      setReviews(res.data.filter(r => r.movie_id === parseInt(id)));
    } catch (err) {
      setError("Login required to submit reviews.");
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Reviews for {movie?.title}</h2>

      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your review"
          required
        />
        <input
          type="number"
          value={rating}
          min="1"
          max="5"
          onChange={(e) => setRating(e.target.value)}
        />
        <button type="submit">Submit Review</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>

      <hr />

      <div>
        {reviews.map((r) => (
          <div key={r.id} style={{ marginBottom: "1rem", borderBottom: "1px solid #ccc" }}>
            <p><strong>{r.username}</strong> rated it {r.rating}/5</p>
            <p>{r.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReviewPage;
