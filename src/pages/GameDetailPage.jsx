"use client"

import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { fetchGameDetails } from '../services/api'; 
const GameDetailPage = () => {
  const { id } = useParams()
  const [game, setGame] = useState(null)
  const [loadingd, setLoadingd] = useState(true)
  console.log(id)
  localStorage.removeItem('search');
  localStorage.setItem('search', 'games');
  useEffect(() => {
  const loadspecificGame = async () => {
      setLoadingd(true)
      try {
        const data = await fetchGameDetails(id)
        setGame(data)
      } catch (error) {
        console.error("Error loading games:", error)
      } finally {
        setLoadingd(false)
      }
  }
  loadspecificGame()
  }, [])

 
  const handleGenreClick = (genreName) => {
    const filters = {
      search: "",
      genre: genreName,
      rating: 0,
      year: "",
    }
    localStorage.setItem("filters", JSON.stringify(filters))
  }

  const handleTagClick = (tag) => {
    const filters = {
      search: "",
      tags: [tag],
      genre: "",
      metacritic: 0,
      year: "",
    }
    localStorage.setItem("filters", JSON.stringify(filters))
  }
  
  if (loadingd) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!game) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold mb-4">Juego no encontrado</h2>
        <Link to="/" className="text-blue-500 hover:underline">
          Volver a la página principal
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="bg-white shadow-xl rounded-lg overflow-hidden max-w-3xl mx-auto"> {/* Añadido max-w-3xl para limitar el ancho */}
            <div className="relative h-96">
              <img
                src={game.background_image || "/placeholder.svg"}
                alt={game.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end">
                <h1 className="text-4xl font-bold text-white p-6">{game.name}</h1>
              </div>
            </div>
            <div className="p-6">
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm font-semibold">
                  {game.released}
                </div>
                <div className="bg-green-100 text-green-800 rounded-full px-3 py-1 text-sm font-semibold">
                  Metacritic Score: {game.metacritic}
                </div>
                
                {/* Tags del juego - Versión mejorada */}
                {game.tags && game.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {game.tags.map((tag) => (
                      <Link 
                        key={tag.id} 
                        to="/games" 
                        onClick={() => handleTagClick(tag)}
                        className="bg-purple-100 text-purple-800 rounded-full px-3 py-1 text-sm font-semibold hover:bg-purple-200 transition-colors"
                      >
                        {tag.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <p className="text-gray-700 oscuroletrasoscuras text-lg mb-6">{game.description_raw}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-xl oscuroletrasoscuras font-semibold mb-2">Plataformas</h2>
                  <ul className="list-disc oscuroletrasoscuras list-inside">
                    {game.platforms && game.platforms.map((p) => <li key={p.platform.name}>{p.platform.name}</li>)}
                  </ul>
                </div>
                <div>
                  <h2 className="text-xl oscuroletrasoscuras font-semibold mb-2">Géneros</h2>
                  <ul className="list-disc oscuroletrasoscuras list-inside">
                    {game.genres &&
                      game.genres.map((g) => (
                        <li key={g.name} className="hover:text-purple-500">
                          <Link to="/games" onClick={() => handleGenreClick(g.name)} className="hover:underline hover:text-purple-500">
                            {g.name}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
                <div>
                  <h2 className="text-xl oscuroletrasoscuras font-semibold mb-2">Desarrolladores</h2>
                  <ul className="list-disc oscuroletrasoscuras list-inside">
                    {game.developers && game.developers.map((d) => <li key={d.name}>{d.name}</li>)}
                  </ul>
                </div>
                <div>
                  <h2 className="text-xl oscuroletrasoscuras font-semibold mb-2">Publicadores</h2>
                  <ul className="list-disc oscuroletrasoscuras list-inside">
                    {game.publishers && game.publishers.map((p) => 
                    <li key={p.name} className="hover:text-purple-500">
                    <Link to={`/publishers/${p.id}`} className="hover:underline hover:text-purple-500">
                      {p.name}
                    </Link>
                    </li>)}
                  </ul>
                </div>
                
               
              </div>
            </div>
          </div>
          <div className="mt-8 text-center">
            <Link
              to="/games"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              Volver a todos los juegos
            </Link>
          </div>
        </main>
      <Footer />
    </div>
  )
}

export default GameDetailPage


