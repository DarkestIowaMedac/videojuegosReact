"use client"

import { useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { fetchGameDetailsAsync } from "../store/slices/gamesSlice"
import { setGenre, addTag, saveFiltersToLocalStorage } from "../store/slices/filtersSlice"

const GameDetailPage = () => {
  const { id } = useParams()
  const dispatch = useDispatch()

  const { gameDetails, loading } = useSelector((state) => ({
    gameDetails: state.games.gameDetails,
    loading: state.games.loading.gameDetails,
  }))

  useEffect(() => {
    localStorage.setItem("search", "games")
    dispatch(fetchGameDetailsAsync(id))
  }, [dispatch, id])

  const handleGenreClick = (genreName) => {
    dispatch(setGenre(genreName))
    dispatch(saveFiltersToLocalStorage())
  }

  const handleTagClick = (tag) => {
    dispatch(addTag(tag))
    dispatch(saveFiltersToLocalStorage())
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!gameDetails) {
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
        <div className="bg-white shadow-xl rounded-lg overflow-hidden max-w-3xl mx-auto">
          <div className="relative h-96">
            <img
              src={gameDetails.background_image || "/placeholder.svg"}
              alt={gameDetails.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end">
              <h1 className="text-4xl font-bold text-white p-6">{gameDetails.name}</h1>
            </div>
          </div>
          <div className="p-6">
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm font-semibold">
                {gameDetails.released}
              </div>
              <div className="bg-green-100 text-green-800 rounded-full px-3 py-1 text-sm font-semibold">
                Metacritic Score: {gameDetails.metacritic}
              </div>

              {/* Tags del juego - Versión mejorada */}
              {gameDetails.tags && gameDetails.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {gameDetails.tags.map((tag) => (
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
            <p className="text-gray-700 oscuroletrasoscuras text-lg mb-6">{gameDetails.description_raw}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl oscuroletrasoscuras font-semibold mb-2">Plataformas</h2>
                <ul className="list-disc oscuroletrasoscuras list-inside">
                  {gameDetails.platforms &&
                    gameDetails.platforms.map((p) => <li key={p.platform.name}>{p.platform.name}</li>)}
                </ul>
              </div>
              <div>
                <h2 className="text-xl oscuroletrasoscuras font-semibold mb-2">Géneros</h2>
                <ul className="list-disc oscuroletrasoscuras list-inside">
                  {gameDetails.genres &&
                    gameDetails.genres.map((g) => (
                      <li key={g.name} className="hover:text-purple-500">
                        <Link
                          to="/games"
                          onClick={() => handleGenreClick(g.name)}
                          className="hover:underline hover:text-purple-500"
                        >
                          {g.name}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
              <div>
                <h2 className="text-xl oscuroletrasoscuras font-semibold mb-2">Desarrolladores</h2>
                <ul className="list-disc oscuroletrasoscuras list-inside">
                  {gameDetails.developers && gameDetails.developers.map((d) => <li key={d.name}>{d.name}</li>)}
                </ul>
              </div>
              <div>
                <h2 className="text-xl oscuroletrasoscuras font-semibold mb-2">Publicadores</h2>
                <ul className="list-disc oscuroletrasoscuras list-inside">
                  {gameDetails.publishers &&
                    gameDetails.publishers.map((p) => (
                      <li key={p.name} className="hover:text-purple-500">
                        <Link to={`/publisher/${p.id}`} className="hover:underline hover:text-purple-500">
                          {p.name}
                        </Link>
                      </li>
                    ))}
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



