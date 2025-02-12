import React, { useState } from 'react';
import { fetchSpecificGame} from '../services/api';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom"

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [specificGames, setSpecificGames] = useState([]);
  const [loadings, setLoadings] = useState(true);

  const navigate = useNavigate()

  const handleSearch = (e) => {
    navigate(`/games/${specificGames}`)
  };

  useEffect(() => {
    const loadGames = async () => {
  try {
          const searchedGames = await fetchSpecificGame()
          setSpecificGames(searchedGames)
        } catch (error) {
          console.error("Error fetching recent games:", error)
        } finally {
          setLoadings(false)
        }   
      }

      loadGames()
    }, []) 
  return (
    <form onSubmit={handleSearch} className="flex items-center max-w-md mx-auto">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar videojuegos..."
        className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded-r-md hover:bg-blue-700 transition duration-300"
      >
        Buscar
      </button>
    </form>
  );
};

export default SearchBar;