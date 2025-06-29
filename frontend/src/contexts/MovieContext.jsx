import { createContext, useState, useContext, useEffect } from "react";
import api from "../api";  // your axios instance

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from backend on mount
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await api.get("/api/favorites/");
        setFavorites(res.data);
      } catch (error) {
        console.error("Failed to load favorites:", error);
      }
    };
    fetchFavorites();
  }, []);

  const addToFavorites = async (movie) => {
    try {
      const res = await api.post("/api/favorites/", {
        movie_id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
      });
      setFavorites((prev) => [...prev, res.data]);
    } catch (error) {
      console.error("Error adding to favorites:", error.response?.data || error.message);
    }
  };

  const removeFromFavorites = async (movieId) => {
    try {
      // Find the favorite id in your state first
      const favorite = favorites.find((fav) => fav.movie_id === movieId);
      if (!favorite) return;

      await api.delete(`/api/favorites/${favorite.id}/`);
      setFavorites((prev) => prev.filter((fav) => fav.movie_id !== movieId));
    } catch (error) {
      console.error("Error removing favorite:", error.response?.data || error.message);
    }
  };

  const isFavorite = (movieId) => {
    return favorites.some((fav) => fav.movie_id === movieId);
  };

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };

  return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;
};
