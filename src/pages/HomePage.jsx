import React from 'react';
import Header from '../components/Header'; // Asegúrate de tener el componente Header
import SearchBar from '../components/SearchBar'; // Asegúrate de tener el componente SearchBar
import Carousel from '../components/Carousel'; // Asegúrate de tener el componente Carousel
import GameCard from '../components/GameCard'; // Asegúrate de tener el componente GameCard
import Footer from '../components/Footer'; // Asegúrate de tener el componente Footer

const HomePage = () => {
  const featuredGames = [
    {
      id: 1,
      title: 'The Legend of Zelda: Breath of the Wild',
      image: 'https://via.placeholder.com/400x200?text=Zelda',
      description: 'Un juego de aventura en un mundo abierto lleno de exploración y desafíos.',
    },
    {
      id: 2,
      title: 'Super Mario Odyssey',
      image: 'https://via.placeholder.com/400x200?text=Mario',
      description: 'Acompaña a Mario en su aventura por el mundo.',
    },
    {
      id: 3,
      title: 'God of War',
      image: 'https://via.placeholder.com/400x200?text=God+of+War',
      description: 'Una historia épica de un padre y su hijo en un mundo mitológico.',
    },
  ];

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
          <Carousel />
        </section>

        <section className="my-8">
          <h2 className="text-2xl font-bold text-center mb-4">Juegos Recientes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {featuredGames.map((game) => (
              <GameCard 
                key={game.id} 
                title={game.title} 
                image={game.image} 
                description={game.description} 
                onDetailsClick={() => console.log(`Ver detalles de ${game.title}`)} 
              />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};
//Apikey: e145f66352074fd2900cce478881b8a7 Mirar apikey.jpg
export default HomePage;