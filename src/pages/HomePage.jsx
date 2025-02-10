import React, { useEffect, useState } from 'react';
import Header from '../components/Header'; // Asegúrate de tener el componente Header
import SearchBar from '../components/SearchBar'; // Asegúrate de tener el componente SearchBar
import Carousel from '../components/Carousel'; // Asegúrate de tener el componente Carousel
import GameCard from '../components/GameCard'; // Asegúrate de tener el componente GameCard
import Footer from '../components/Footer'; // Asegúrate de tener el componente Footer

const HomePage = () => {
  const [featuredGames, setFeaturedGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiKey = 'e145f66352074fd2900cce478881b8a7'; // Tu API Key de RAWG

  const fetchRandomGames = async () => {
    try {
      const response = await fetch(`https://api.rawg.io/api/games?key=${apiKey}&page_size=20&ordering=released`);
      if (!response.ok) {
        throw new Error('Error en la solicitud a la API');
      }
      const data = await response.json();
      setFeaturedGames(data.results);
    } catch (error) {
      console.error('Error fetching games:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomGames();
  }, []);

  const handleSearch = (query) => {
    console.log('Buscar:', query);
    // Aquí puedes implementar la lógica para manejar la búsqueda
  };

  return (
    <div>
      <Header />
      <main className="p-4">
        <SearchBar onSearch={handleSearch} />

        <section className="my-8">
          <h2 className="text-2xl font-bold text-center mb-4">Juegos Destacados</h2>
          {loading ? (
            <p>Cargando juegos...</p>
          ) : (
            <Carousel games={featuredGames} />
          )}
        </section>

        <section className="my-8">
          <h2 className="text-2xl font-bold text-center mb-4">Juegos Recientes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {featuredGames.map((game) => (
              <GameCard 
                key={game.id} 
                title={game.name} 
                image={game.background_image} 
                description={game.description || 'Descripción no disponible'} 
                onDetailsClick={() => console.log(`Ver detalles de ${game.name}`)} 
              />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;