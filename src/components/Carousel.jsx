"use client"

import { useState, useEffect } from "react"

const Carousel = ({ games }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [windowWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    handleResize() // Set initial width
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Filtrar juegos con puntuación >= 4.5
  const filteredGames = games.filter((game) => game.rating >= 4.5)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredGames.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + filteredGames.length) % filteredGames.length)
  }

  // Función para determinar el tamaño de fuente basado en el ancho de la ventana
  const getFontSize = (baseSize) => {
    if (windowWidth < 640) return baseSize
    if (windowWidth < 768) return baseSize * 1.2
    if (windowWidth < 1024) return baseSize * 1.4
    if (windowWidth < 1280) return baseSize * 1.8
    return baseSize * 2.4
  }

  return (
    <div className="relative w-3/5 m-auto bg-red-800 rounded-xl shadow-2xl overflow-hidden">
      {filteredGames.length === 0 ? (
        <p className="text-white text-center py-20" style={{ fontSize: `${getFontSize(1.5)}rem` }}>
          No hay juegos destacados con alta puntuación
        </p>
      ) : (
        <>
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {filteredGames.map((game, index) => (
              <div key={index} className="min-w-full bg-opacity-0 p-0">
                <div className="relative rounded-lg shadow-xl" style={{ paddingTop: "56.25%" }}>
                  {" "}
                  {/* 16:9 Aspect Ratio */}
                  <img
                    src={game.background_image || "/placeholder.svg"}
                    alt={game.name}
                    className="absolute top-0 left-0 w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 p-2 backdrop-blur-sm">
                    <h3 className="text-white font-bold mb-1 truncate" style={{ fontSize: `${getFontSize(1)}rem` }}>
                      {game.name}
                    </h3>
                    <p className="text-yellow-400 font-semibold" style={{ fontSize: `${getFontSize(0.875)}rem` }}>
                      Rating: {game.rating.toFixed(1)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-transparent bg-opacity-30 border-none hover:border-none hover:text-purple-700 text-blue-700 p-2  transition-all duration-0"
            aria-label="Anterior"
            style={{ fontSize: `${getFontSize(1.5)}rem` }}
          >
            &#10094;
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-transparent bg-opacity-30 border-none hover:border-none hover:text-purple-700 text-blue-700 p-2 rounded-full transition-all duration-0"
            aria-label="Siguiente"
            style={{ fontSize: `${getFontSize(1.5)}rem` }}
          >
            &#10095;
          </button>
        </>
      )}
    </div>
  )
}

export default Carousel

