import './css/App.css'
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import NavBar from './components/NavBar'
import { Routes, Route } from "react-router-dom"
import { MovieProvider } from './contexts/MovieContext'
import Login from "./pages/Login"
import Register from "./pages/Register"
import MovieDetail from "./pages/MovieDetail";


function App() {
  return (
    <MovieProvider>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
      </main>
    </MovieProvider>
  )
}

export default App  
