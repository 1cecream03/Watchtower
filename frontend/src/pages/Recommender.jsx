//import { useState } from "react";
//import { getChatGPTRecommendation } from "../services/openai"
//import "../css/Recommender.css";
//
//function Recommender() {
//  const [prompt, setPrompt] = useState("");
//  const [response, setResponse] = useState("");
//  const [loading, setLoading] = useState(false);
//  const [error, setError] = useState("");
//
//  const handleSubmit = async (e) => {
//    e.preventDefault();
//    setLoading(true);
//    setError("");
//    setResponse("");
//
//    try {
//      const res = await getChatGPTRecommendation(prompt);
//      setResponse(res);
//    } catch (err) {
//      setError("Failed to get recommendation. Try again.");
//      console.error(err);
//    } finally {
//      setLoading(false);
//    }
//  };
//
//  return (
//    <div className="recommender-container">
//      <h1>Movie Recommender</h1>
//      <form onSubmit={handleSubmit}>
//        <textarea
//          placeholder="Type your movie preferences here..."
//          value={prompt}
//          onChange={(e) => setPrompt(e.target.value)}
//          rows={5}
//          cols={50}
//          required
//        />
//        <br />
//        <button type="submit" disabled={loading}>
//          {loading ? "Loading..." : "Get Recommendation"}
//        </button>
//      </form>
//      {error && <p className="error">{error}</p>}
//      {response && (
//        <div className="response-box">
//          <h3>Recommendation:</h3>
//          <p>{response}</p>
//        </div>
//      )}
//    </div>
//  );
//}
//
//export default Recommender;
//