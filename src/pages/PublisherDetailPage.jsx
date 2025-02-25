"use client"

import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
import GameCard from "../components/GameCard"
import { fetchPublisherDetails, fetchPublisherGames } from "../services/api"

const PublisherDetailPage = () => {
  const { id } = useParams()
  const [publisher, setPublisher] = useState(null)
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadPublisherData = async () => {
      setLoading(true)
      setError(null)
      try {
        const [publisherData, gamesData] = await Promise.all([fetchPublisherDetails(id), fetchPublisherGames(id)])
        setPublisher(publisherData)
        setGames(gamesData)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadPublisherData()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error || !publisher) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">{error || "Distribuidora no encontrada"}</h1>
        <Link to="/publishers" className="text-blue-500 hover:underline">
          Volver a distribuidoras
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Publisher Info Card */}
        <div className="bg-white shadow-xl rounded-lg overflow-hidden max-w-3xl mx-auto mb-12">
          <div className="relative h-96">
            <img
              src={publisher.image_background || "/placeholder.svg"}
              alt={publisher.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end">
              <h1 className="text-4xl font-bold text-white p-6">{publisher.name}</h1>
            </div>
          </div>
          <div className="p-6">
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm font-semibold">
                {publisher.games_count.toLocaleString()} juegos publicados
              </div>
              {publisher.website && (
                <a
                  href={publisher.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-100 text-green-800 rounded-full px-3 py-1 text-sm font-semibold hover:bg-green-200 transition-colors"
                >
                  Sitio Web
                </a>
              )}
            </div>
            {publisher.description && (
              <div className="text-gray-700 text-lg mb-6" dangerouslySetInnerHTML={{ __html: publisher.description }} />
            )}
            {publisher.description_raw && (
              <div>
                <h2 className="text-xl font-semibold mb-2">Información Adicional</h2>
                <p className="text-gray-700">{publisher.description_raw}</p>
              </div>
            )}
          </div>
        </div>

        {/* Games Section */}
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Juegos Destacados</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {games.map((game) => (
              <GameCard
                key={game.id}
                id={game.id}
                title={game.name}
                image={game.background_image}
                description={game.description_raw || ""}
              />
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/publishers"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Volver a distribuidoras
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default PublisherDetailPage

