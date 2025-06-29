import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../css/Form.css"
import { Link } from "react-router-dom";

function Form({ route, method }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const name = method === "login" ? "Login" : "Register";

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const res = await api.post(route, { username, password })
      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        localStorage.setItem("username", username);
        navigate("/")
      } else {
        navigate("/login")
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
      setLoading(false)
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
        />
        <input
          className="form-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button className="form-button" type="submit">
          {name}
        </button>
        <p className="form-error">
          {errorMessage || "\u00A0"}
        </p>
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
            Don't have an account?{" "}
            <Link to="/register" className="form-link">
              Register here
            </Link>
          </p>
        )}
        <div className="spinner-container">
          <div className="spinner" style={{ visibility: loading ? 'visible' : 'hidden' }}></div>
        </div>
      </form>
    </div>
  );
}

export default Form