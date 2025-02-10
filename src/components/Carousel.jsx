import React, { useState } from 'react';

const Carousel = ({ games }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filtrar juegos con puntuación >= 4.5
  const filteredGames = games.filter(game => game.rating >= 4.5);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredGames.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + filteredGames.length) % filteredGames.length);
  };

  return (
    <div className="relative w-full overflow-hidden">
      {filteredGames.length === 0 ? (
        <p>No hay juegos destacados con puntuación 4.5</p>
      ) : (
        <>
          <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {filteredGames.map((game, index) => (
              <div key={index} className="min-w-full">
                <img src={game.background_image} alt={game.name} className="w-full h-auto" />
                <h3 className="text-center">{game.name}</h3>
                <p className="text-center">Rating: {game.rating}</p>
              </div>
            ))}
          </div>
          <button onClick={prevSlide} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full">
            &#10094; {/* Icono de flecha izquierda */}
          </button>
          <button onClick={nextSlide} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full">
            &#10095; {/* Icono de flecha derecha */}
          </button>
        </>
      )}
    </div>
  );
};

export default Carousel;