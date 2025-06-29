import { useEffect, useState } from 'react';
import api from '../api';
import '../css/ReviewList.css'

function AllReviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await api.get('/api/reviews/');
        setReviews(res.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, []);

  return (
    <div className="review-page">
      <h1>All Movie Reviews</h1>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <ul className="review-list">
          {reviews.map((review, index) => (
            <li key={index} className="review-card">
              <h3>Movie ID: {review.movie_id}</h3>
              <p><strong>User:</strong> {review.username}</p>
              <p><strong>Rating:</strong> {review.rating}/5</p>
              <p>{review.content}</p>
              <p className="timestamp">{new Date(review.created_at).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AllReviews;
