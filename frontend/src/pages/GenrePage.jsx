import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMoviesByGenre, getGenres } from "../services/movieapi";
import MovieCard from "../components/MovieCard";
import Spinner from "../components/Spinner";
import "../css/Home.css"; 

function GenrePage() {
  const { id } = useParams();
  const [movies, setMovies] = useState([]);
  const [genreName, setGenreName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMoviesAndGenre = async () => {
      try {
        setLoading(true);
        const [moviesData, genreList] = await Promise.all([
          getMoviesByGenre(id),
          getGenres(),
        ]);

        setMovies(moviesData);

        const matchedGenre = genreList.find(
          (genre) => genre.id.toString() === id
        );
        setGenreName(matchedGenre ? matchedGenre.name : "Unknown Genre");
      } catch (error) {
        console.error("Failed to load genre or movies", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMoviesAndGenre();
  }, [id]);

  if (loading) return <Spinner />;

  return (
    <div className="home">
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        {genreName} Movies
      </h2>
      <div className="movies-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default GenrePage;
