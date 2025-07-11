import MovieCard from "../components/MovieCard"
import { useState, useEffect } from "react"
import { searchMovies, getPopularMovies } from "../services/movieapi";
import '../css/Home.css'
import { useNavigate } from "react-router-dom"

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        loadPopularMovies(page);
    }, [page]);

    const loadPopularMovies = async (pageNumber) => {
        setLoading(true);
        try {
            const newMovies = await getPopularMovies(pageNumber);
            if (newMovies.length === 0) {
                setHasMore(false);
            } else {
                setMovies((prev) => {
                    const existingIds = new Set(prev.map((m) => m.id));
                    const uniqueNewMovies = newMovies.filter((m) => !existingIds.has(m.id));
                    return [...prev, ...uniqueNewMovies];
                });
            }
        } catch (err) {
            console.log(err);
            setError("Failed to load movies...");
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        if (loading) return;

        setLoading(true);
        try {
            const searchResults = await searchMovies(searchQuery);
            setMovies(searchResults);
            setError(null);
            setHasMore(false); // hide Load More when searching
        } catch (err) {
            console.log(err);
            setError("Failed to search movies");
        } finally {
            setLoading(false);
        }
        setSearchQuery("");
    };

    return (
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    placeholder="Search for movies..."
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="search-button">
                    Search
                </button>
            </form>

            {error && <div className="error-message">{error}</div>}

            <div className="movies-grid">
                {movies.map((movie) => (
                    <MovieCard movie={movie} key={movie.id} />
                ))}
            </div>

            {hasMore && !loading && (
                <div style={{ textAlign: "center", margin: "30px" }}>
                    <button
                        onClick={() => setPage((prev) => prev + 1)}
                        className="load-more-button"
                    >
                        Load More
                    </button>
                </div>
            )}

            {loading && <div className="loading">Loading...</div>}
        </div>
    );
}

export default Home;
