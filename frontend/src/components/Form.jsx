import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { useAuth } from "../contexts/AuthContext";
import { useMovieContext } from "../contexts/MovieContext";
import "../css/Form.css";

function Form({ route, method }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();
  const { fetchFavorites } = useMovieContext();

  const name = method === "login" ? "Login" : "Register";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const res = await api.post(route, { username, password });

      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        localStorage.setItem("username", username);

        login();
        await fetchFavorites();
        navigate(`/`);
      } else {
        navigate("/login");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage("Incorrect username or password.");
      } else if (error.response && error.response.data) {
        const errorData = error.response.data;
        if (errorData.username) {
          setErrorMessage(errorData.username[0]);
        } else {
          setErrorMessage("An error occurred. Please try again.");
        }
      } else {
        setErrorMessage("Network error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <form onSubmit={handleSubmit} className="form-container">
        <h1>WatchTower {name}</h1>
        <input
          className="form-input"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          className="form-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button className="form-button" type="submit">
          {name}
        </button>
        <p className="form-error">{errorMessage || "\u00A0"}</p>

        {method === "register" && (
          <p className="form-footer-text">
            Already registered?{" "}
            <Link to="/login" className="form-link">
              Login here
            </Link>
          </p>
        )}

        {method === "login" && (
          <p className="form-footer-text">
            Don’t have an account?{" "}
            <Link to="/register" className="form-link">
              Register here
            </Link>
          </p>
        )}
      </form>

      {loading && (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      )}
    </div>
  );
}

export default Form;
