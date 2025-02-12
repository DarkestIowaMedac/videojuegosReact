"use client"

import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"

const GameDetailPage = () => {
  const { id } = useParams()
  const [game, setGame] = useState(null)
  const [loading, setLoading] = useState(true)

  const apiKey = "e145f66352074fd2900cce478881b8a7"

  useEffect(() => {
    const fetchGameDetails = async () => {
      setLoading(true)
      try {
        const response = await fetch(`https://api.rawg.io/api/games/${id}?key=${apiKey}`)
        if (!response.ok) {
          throw new Error("Error en la solicitud a la API")
        }
        const data = await response.json()
        setGame(data)
      } catch (error) {
        console.error("Error fetching game details:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchGameDetails()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!game) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Juego no encontrado</h1>
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
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
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
                Rating: {game.rating}
              </div>
            </div>
            <p className="text-gray-700 text-lg mb-6">{game.description_raw}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">Plataformas</h2>
                <ul className="list-disc list-inside">
                  {game.platforms && game.platforms.map((p) => <li key={p.platform.name}>{p.platform.name}</li>)}
                </ul>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">Géneros</h2>
                <ul className="list-disc list-inside">
                  {game.genres && game.genres.map((g) => <li key={g.name}>{g.name}</li>)}
                </ul>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">Desarrolladores</h2>
                <ul className="list-disc list-inside">
                  {game.developers && game.developers.map((d) => <li key={d.name}>{d.name}</li>)}
                </ul>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">Publicadores</h2>
                <ul className="list-disc list-inside">
                  {game.publishers && game.publishers.map((p) => <li key={p.name}>{p.name}</li>)}
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


