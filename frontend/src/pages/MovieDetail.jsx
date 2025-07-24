import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieDetails } from "../services/movieapi";
import "../css/MovieDetail.css";

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (error) {
        console.error("Failed to fetch movie details", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (!movie) return <div className="error-message">Movie not found</div>;

  const trailer = movie.videos.results.find(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  );

  const cast = movie.credits.cast.slice(0, 5);

  return (
    <div className="movie-detail-container">
      {movie.poster_path && (
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="movie-poster"
        />
      )}

      <h1 className="movie-title">{movie.title}</h1>
      <p className="movie-overview">{movie.overview}</p>

      <section className="cast-section">
        <h3 className="cast-title">Top Cast</h3>
        <div className="cast-list">
          {cast.map((member) => (
            <div key={member.cast_id} className="cast-member">
              {member.profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w185${member.profile_path}`}
                  alt={member.name}
                  className="cast-image"
                />
              ) : (
                <div className="cast-no-image">No Image</div>
              )}
              <p className="cast-name">{member.name}</p>
              <p className="cast-character">{member.character}</p>
            </div>
          ))}
        </div>
      </section>

      {trailer && (
        <section className="trailer-section">
          <h3 className="trailer-title">Trailer</h3>
          <a
            href={`https://www.youtube.com/watch?v=${trailer.key}`}
            target="_blank"
            rel="noopener noreferrer"
            className="trailer-link"
          >
            <img
              src={`https://img.youtube.com/vi/${trailer.key}/0.jpg`}
              alt="Trailer Thumbnail"
              className="trailer-thumbnail"
            />
            <div className="play-icon" />
          </a>
        </section>
      )}
    </div>
  );
}

export default MovieDetail;
