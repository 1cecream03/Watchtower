import './css/App.css'
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import Recommender from './pages/Recommender'
import NavBar from './components/NavBar'
import { Routes, Route } from "react-router-dom"
import { MovieProvider } from './contexts/MovieContext'

function App() {
  return (
    <MovieProvider>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/recommender" element={<Recommender />} />
        </Routes>
      </main>
    </MovieProvider>
  )
}

export default App  
