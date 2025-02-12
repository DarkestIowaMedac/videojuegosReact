import React, { useEffect, useState } from 'react';
import Header from '../components/Header'; 
import SearchBar from '../components/SearchBar'; 
import Carousel from '../components/Carousel'; 
import GameCard from '../components/GameCard'; 
import Footer from '../components/Footer'; 

const HomePage = () => {
  const [betterGames, setBetterGames] = useState([]);
  const [featuredGames, setFeaturedGames] = useState([]);
  const [loadingb, setLoadingb] = useState(true);
  const [loadingf, setLoadingf] = useState(true);

  const apiKey = 'e145f66352074fd2900cce478881b8a7'; 

  const fetchRecentGames = async () => {
    try {
      const response = await fetch(`https://api.rawg.io/api/games?key=${apiKey}&page_size=20&ordering=released`);
      if (!response.ok) {
        throw new Error('Error en la solicitud a la API');
      }
      const data = await response.json();
      //console.log("API response:", data.results[0]);
      setFeaturedGames(data.results);
    } catch (error) {
      console.error('Error fetching games:', error);
    } finally {
      setLoadingf(false);
    }
  };

  const fetchBetterGames = async () => {
    try {
      const response = await fetch(`https://api.rawg.io/api/games?key=${apiKey}&page_size=5&ordering=-rating`);
      if (!response.ok) {
        throw new Error('Error en la solicitud a la API');
      }
      const data = await response.json();
      setBetterGames(data.results);
    } catch (error) {
      console.error('Error fetching games:', error);
    } finally {
      setLoadingb(false);
    }
  };

  useEffect(() => {
    fetchRecentGames()
    fetchBetterGames()
  }, []) 


  return (
    <div>
      <Header />
      <main className="p-4">
        <section className="my-8">
          <h2 className="text-2xl font-bold text-center mb-4">Juegos Destacados</h2>
          {loadingb ? (
            <p>Cargando juegos...</p>
          ) : (
            <Carousel games={betterGames} />
          )}
        </section>

        <section className="my-8">
          <h2 className="text-2xl font-bold text-center mb-4">Juegos Recientes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {loadingf ? (
                <p>Cargando juegos...</p>
                ) : (
                featuredGames.map((game) => (
                  <GameCard 
                    //key={game.id}
                    id={game.id}
                    title={game.name} 
                    image={game.background_image} 
                    description={game.description || game.description_raw || 'No description available'} 
                  />
                ))
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;