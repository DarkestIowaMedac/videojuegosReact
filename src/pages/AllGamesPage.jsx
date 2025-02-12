"use client"

import { useEffect, useState } from "react"
import Header from "../components/Header"
import GameCard from "../components/GameCard"
import Footer from "../components/Footer"
import ArrowButton from "../components/ArrowButton"
import { fetchAllGames } from "../services/api.js"
import { useParams } from 'react-router-dom';

const AllGamesPage = () => {
  const { query } = useParams();
  const [allGames, setAllGames] = useState([])
  const [filteredGames, setFilteredGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [filters, setFilters] = useState({
    search: "",
    genre: "",
    rating: 0,
    year: "",
  })
  
  const loadAllGames = async () => {
    setLoading(true)
    try {
      const data = await fetchAllGames(currentPage,query)
      setAllGames(data.results)
      setFilteredGames(data.results)
      setTotalPages(Math.ceil(data.count / 40))
    } catch (error) {
      console.error("Error loading games:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadAllGames(currentPage) 
  }, [currentPage]) 

  useEffect(() => {
    const filtered = allGames.filter(
      (game) =>
        game.name.toLowerCase().includes(filters.search.toLowerCase()) &&
        (filters.genre === "" || game.genres.some((g) => g.name.toLowerCase() === filters.genre.toLowerCase())) &&
        game.rating >= filters.rating &&
        (filters.year === "" || new Date(game.released).getFullYear().toString() === filters.year),
    )
    setFilteredGames(filtered)
  }, [filters, allGames])


  const handleSearchChange = (query) => {
    setFilters((prev) => ({ ...prev, search: query }))
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
      console.log(currentPage)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
      console.log(currentPage)
    }
  }

  const genres = [...new Set(allGames.flatMap((game) => game.genres.map((g) => g.name)))]
  const years = [...new Set(allGames.map((game) => new Date(game.released).getFullYear()))].sort((a, b) => b - a)

  return (
    <div>
      <Header />
      <main className="p-4">
        <h1 className="text-3xl font-bold text-center mb-6">Todos los Juegos</h1>

        <div className="mb-6 flex flex-wrap gap-4 justify-center">
          <select name="genre" value={filters.genre} onChange={handleFilterChange} className="p-2 border rounded">
            <option value="">Todos los géneros</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
          <select name="rating" value={filters.rating} onChange={handleFilterChange} className="p-2 border rounded">
            <option value="0">Todas las puntuaciones</option>
            <option value="4">4+</option>
            <option value="3">3+</option>
            <option value="2">2+</option>
            <option value="1">1+</option>
          </select>
          <select name="year" value={filters.year} onChange={handleFilterChange} className="p-2 border rounded">
            <option value="">Todos los años</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <p className="text-center">Cargando juegos...</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredGames.map((game) => (
                <GameCard 
                key={game.id}
                id={game.id}
                title={game.name} 
                image={game.background_image} 
                description={game.description || game.description_raw || 'No description available'} 
              />
              ))}
            </div>
            <div className="mt-6 flex justify-center items-center gap-4">
              <ArrowButton direction="left" onClick={handlePrevPage} disabled={currentPage === 1} />
              <span>
                Página {currentPage} de {totalPages}
              </span>
              <ArrowButton direction="right" onClick={handleNextPage} disabled={currentPage === totalPages} />
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  )
}

export default AllGamesPage

