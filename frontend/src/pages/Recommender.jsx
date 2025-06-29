import { useState } from "react";
import { useMovieContext } from "../contexts/MovieContext";
import axios from "axios";

function Recommendation() {
  const { favorites } = useMovieContext();
  const [inputMovie, setInputMovie] = useState("");
  const [recommendations, setRecommendations] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRecommend = async () => {
    setLoading(true);
    const favTitles = favorites.map((m) => m.title).join(", ");
    const prompt = `Based on these favorite movies: ${favTitles}, recommend other movies. Also, recommend similar movies to "${inputMovie}" if it's provided.`;

    try {
      const res = await axios.post("https://api.openai.com/v1/chat/completions", {
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      }, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        }
      });

      setRecommendations(res.data.choices[0].message.content);
    } catch (err) {
      console.error("Error fetching recommendations:", err);
      setRecommendations("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>🎬 Movie Recommendations</h2>
      <input
        type="text"
        placeholder="Optional: Movie you want to watch"
        value={inputMovie}
        onChange={(e) => setInputMovie(e.target.value)}
        style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
      />
      <button onClick={handleRecommend} disabled={loading}>
        {loading ? "Generating..." : "Get Recommendations"}
      </button>
      <div style={{ marginTop: "2rem", whiteSpace: "pre-wrap" }}>
        {recommendations}
      </div>
    </div>
  );
}

export default Recommendation;
