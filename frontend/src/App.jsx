import './css/App.css';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import NavBar from './components/NavBar';
import { Routes, Route } from "react-router-dom";
import { MovieProvider } from './contexts/MovieContext';
import { AuthProvider } from './contexts/AuthContext';
import Login from "./pages/Login";
import Register from "./pages/Register";
import MovieDetail from "./pages/MovieDetail";
import ProtectedRoute from './components/ProtectedRoute';
import ReviewPage from "./pages/ReviewPage";
import ReviewList from "./pages/ReviewList";
import Recommendation from './pages/Recommender';
import GenrePage from './pages/GenrePage';


function App() {
  return (
    <AuthProvider>
      <MovieProvider>
        <NavBar />
        <main className="main-content">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
            <Route path="/recommendations" element={<Recommendation />} />
            <Route
              path="/favorites"
              element={
                <ProtectedRoute>
                  <Favorites />
                </ProtectedRoute>
              }
            />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/movie/:id/reviews" element={<ReviewPage />} />
            <Route path="/reviews" element={<ReviewList />} />
            <Route path="/genre/:id" element={<GenrePage />} />
          </Routes>
        </main>
      </MovieProvider>
    </AuthProvider>
  );
}

export default App;
