import React, { useEffect, useState } from 'react';
import Header from '../components/Header'; 
import SearchBar from '../components/SearchBar'; 
import Carousel from '../components/Carousel'; 
import GameCard from '../components/GameCard'; 
import Footer from '../components/Footer'; 
import { fetchRecentGames, fetchBetterGames } from '../services/api'; 

const HomePage = () => {
  const [betterGames, setBetterGames] = useState([]);
  const [featuredGames, setFeaturedGames] = useState([]);
  const [loadingb, setLoadingb] = useState(true);
  const [loadingf, setLoadingf] = useState(true);

  useEffect(() => {
    const loadGames = async () => {
      try {
        const recentGames = await fetchRecentGames()
        setFeaturedGames(recentGames)
      } catch (error) {
        console.error("Error fetching recent games:", error)
      } finally {
        setLoadingf(false)
      }

      try {
        const topGames = await fetchBetterGames()
        setBetterGames(topGames)
      } catch (error) {
        console.error("Error fetching top games:", error)
      } finally {
        setLoadingb(false)
      }
    }

    loadGames()
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
                    key={game.id}
                    id={game.id}
                    title={game.name} 
                    image={game.background_image} 
                    description={game.description} 
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