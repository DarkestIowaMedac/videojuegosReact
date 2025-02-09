import React, { useState } from 'react';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    'https://via.placeholder.com/800x400?text=Imagen+1',
    'https://via.placeholder.com/800x400?text=Imagen+2',
    'https://via.placeholder.com/800x400?text=Imagen+3',
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full overflow-hidden">
      <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((image, index) => (
          <div key={index} className="min-w-full">
            <img src={image} alt={`Slide ${index + 1}`} className="w-full h-auto" />
          </div>
        ))}
      </div>
      <button onClick={prevSlide} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full">
        &#10094; {/* Icono de flecha izquierda */}
      </button>
      <button onClick={nextSlide} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full">
        &#10095; {/* Icono de flecha derecha */}
      </button>
    </div>
  );
};

export default Carousel;