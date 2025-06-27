import MovieCard from "../components/MovieCard"
import { useState, useEffect } from "react"
import { searchMovies, getPopularMovies } from "../services/api";
import '../css/Home.css'
import { useNavigate } from "react-router-dom"

function Home() {
    const [searchQuery, setSearchQuery] = useState(""); //anytime we update the state, it will rerender and update based on state
    const [movies, setMovies] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()


    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies()
                setMovies(popularMovies)
            } catch (err) {
                console.log(err)
                setError("Failed to load movies...")
            }
            finally {
                setLoading(false)
            }
        }

        loadPopularMovies()
    }, [])
    //function called when dependency array changes
    //useEffect allow to add side effects to func/ compo and define when they run

    const handleSearch = async (e) => {
        e.preventDefault() //prevent default behaviour, clear
        if (!searchQuery.trim()) return
        if (loading) return

        setLoading(true)
        try {
            const searchResults = await searchMovies(searchQuery)
            setMovies(searchResults)
            setError(null)
        } catch (err) {
            console.log(err)
            setError("Failed to search movies")
        } finally {
            setLoading(false)
        }
        setSearchQuery("")
    };

    return (
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    placeholder="Search for movies..."
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} //??this is how u update the state
                />
                <button type="submit" className="search-button">
                    Search
                </button>
            </form>
            <button
                onClick={() => navigate("/login")}
                style={{ margin: "20px 0", padding: "10px 20px", cursor: "pointer" }}
            >
                Login
            </button>
            <button
                onClick={() => navigate("/recommender")}
                style={{ margin: "20px 0", padding: "10px 20px", cursor: "pointer" }}
            >
                Go to Recommender
            </button>

            {error && <div className="error-message">{error}</div>}

            {loading ? (
                <div className="loading">Loading...</div>
            ) : (
                <div className="movies-grid">
                    {movies.map((movie) => (
                        <MovieCard movie={movie} key={movie.id} /> //rerun entire component while state remains, return new UI
                    ))}
                </div>
            )}
        </div>
    );
}

export default Home