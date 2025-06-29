import './css/App.css'
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import NavBar from './components/NavBar'
import { Routes, Route } from "react-router-dom"
import { MovieProvider } from './contexts/MovieContext'
import { AuthProvider } from './contexts/AuthContext'
import Login from "./pages/Login"
import Register from "./pages/Register"
import MovieDetail from "./pages/MovieDetail"
import ProtectedRoute from './components/ProtectedRoute'  // import your custom component\

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
            <Route
              path="/favorites"
              element={
                <ProtectedRoute>
                  <Favorites />
                </ProtectedRoute>
              }
            />
            <Route path="/movie/:id" element={<MovieDetail />} />
          </Routes>
        </main>
      </MovieProvider>
    </AuthProvider>
  )
}

export default App
