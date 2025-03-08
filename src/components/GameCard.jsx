"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const GameCard = ({ id, title, image, description }) => {
  const navigate = useNavigate()
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const checkFavorite = () => {
      const favs = JSON.parse(localStorage.getItem("favs")) || []
      setIsFavorite(favs.some((fav) => fav.id === id))
    }

    checkFavorite()

    window.addEventListener("favoritesChanged", checkFavorite)

    return () => {
      window.removeEventListener("favoritesChanged", checkFavorite)
    }
  }, [id])

  const handleDetailsClick = () => {
    navigate(`/game/${id}`)
  }

  const toggleFavorite = (e) => {
    e.stopPropagation() // Prevenir que se active el click del card

    const favs = JSON.parse(localStorage.getItem("favs")) || []

    if (isFavorite) {
      const updatedFavs = favs.filter((fav) => fav.id !== id)
      localStorage.setItem("favs", JSON.stringify(updatedFavs))
    } else {
      const updatedFavs = [...favs, { id, title: title || "", image }]
      localStorage.setItem("favs", JSON.stringify(updatedFavs))
    }

    setIsFavorite(!isFavorite)

    window.dispatchEvent(new Event("favoritesChanged"))
  }

  return (
    <div className="oscuro w-full h-[350px] rounded-lg overflow-hidden shadow-lg bg-white transition-transform transform hover:scale-105 relative">
     
      <button
        onClick={toggleFavorite}
        className="absolute top-2 right-2 bg-white/80 hover:bg-white p-1.5 rounded-full shadow-md z-10 transition-colors"
        aria-label="Añadir a favoritos"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill={isFavorite ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-yellow-500"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      </button>

      <div className="h-48">
        {" "}
        {/* Contenedor fijo para la imagen */}
        <img className="w-full h-full object-cover" src={image || "/placeholder.svg"} alt={title} />
      </div>
      <div className="p-4 h-[134px] flex flex-col justify-between">
        {" "}
        {/* Altura fija para el contenido */}
        <h3 className="font-bold text-xl line-clamp-2 mb-2 ">{title}</h3>
        <button
          onClick={handleDetailsClick}
          className="bg-blue-500 text-white font-bold py-1 px-4 rounded hover:bg-blue-700 transition duration-300 mt-auto"
        >
          Ver Detalles
        </button>
      </div>
    </div>
  )
}

export default GameCard

