import { useEffect, useState } from "react";
import api from "../api";
import { useAuth } from "../contexts/AuthContext";
import "../css/ReviewList.css"; // reuse the same styling

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await api.get("/api/favorites/");
        setFavorites(res.data);
      } catch (err) {
        console.error("Failed to load favorites:", err);
      }
    };

    if (isLoggedIn) {
      fetchFavorites();
    } else {
      setFavorites([]);
    }
  }, [isLoggedIn]);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/favorites/${id}/`);
      setFavorites((prev) => prev.filter((fav) => fav.id !== id));
    } catch (err) {
      console.error("Failed to delete favorite:", err);
      alert("Failed to delete favorite.");
    }
  };

  return (
    <div className="reviewlist-page">
      <h2>Your Favorites</h2>

      <div className="reviews-grid">
        {favorites.map((fav) => (
          <div className="review-card" key={fav.id}>
            <div className="movie-poster">
              <img
                src={`https://image.tmdb.org/t/p/w500${fav.poster_path}`}
                alt={fav.title}
              />
            </div>
            <div className="movie-info">
              <h3>{fav.title}</h3>
              <button
                className="delete-btn"
                onClick={() => handleDelete(fav.id)}
              >
                ❌
              </button>
            </div>
          </div>
        ))}
      </div>

      {favorites.length === 0 && (
        <p style={{ textAlign: "center", marginTop: "2rem" }}>
          You haven’t favorited any movies yet.
        </p>
      )}
    </div>
  );
}

export default Favorites;
