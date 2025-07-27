import { useState } from "react";
import { getMovieRecommendation } from "../services/openai";
import "../css/Recommender.css";

function Recommender() {
  const [prompt, setPrompt] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setRecommendation("");

    if (!prompt.trim()) {
      setError("Please describe a movie you'd like to watch.");
      return;
    }

    setLoading(true);

    try {
      const res = await getMovieRecommendation(prompt);
      setRecommendation(res.recommendation);
    } catch (err) {
      setError("Failed to get recommendation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="recommender-container">
      <h2>Movie Recommender</h2>
      <form onSubmit={handleSubmit} className="recommender-form">
        <textarea
          placeholder="Describe what kind of movie you'd like to watch..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={5}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Get Recommendation"}
        </button>
      </form>

      {error && <p className="error-text">{error}</p>}

      {recommendation && (
        <div className="recommendation-result">
          <h3>Recommended Movie:</h3>
          <p>{recommendation}</p>
        </div>
      )}
    </div>
  );
}

export default Recommender;
