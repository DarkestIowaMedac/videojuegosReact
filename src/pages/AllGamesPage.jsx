"use client"

import { useEffect, useState } from "react"
import Header from "../components/Header"
import GameCard from "../components/GameCard"
import Footer from "../components/Footer"
import ArrowButton from "../components/ArrowButton"
import { fetchAllGames, fetchGenres } from "../services/api.js"
import { useParams } from 'react-router-dom';

const AllGamesPage = () => {
  const { query } = useParams();
  const [allGames, setAllGames] = useState([])
  const [allGenres, setAllGenres] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadinggenres, setLoadinggenres] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const savedFilters = JSON.parse(localStorage.getItem('filters')) || {};
  const [filters, setFilters] = useState({
    search: "",
    genre: savedFilters.genre || "",
    metacritic: savedFilters.metacritic || 0,
    year: savedFilters.year || "",
  })
  
  const loadAllGames = async () => {
    setLoading(true)
    try {
      const data = await fetchAllGames(currentPage,filters)
      setAllGames(data.results)
      setTotalPages(Math.ceil(data.count / 40))
    } catch (error) {
      console.error("Error loading games:", error)
    } finally {
      setLoading(false)
    }
  }

  const loadGenres = async () => {
    setLoadinggenres(true)
    try {
      const data = await fetchGenres()
      console.log("los datos")
      console.log(data)
      setAllGenres(data)
      
    } catch (error) {
      console.error("Error loading games:", error)
    } finally {
      setLoadinggenres(false)
    }
  }

  useEffect(() => {
    loadGenres() 
  }, []) 

  useEffect(() => {
    console.log(filters)
    loadAllGames(currentPage, filters) 
  }, [currentPage, filters]) 

  useEffect(() => {
    if (query) {
      setFilters((prev) => ({ ...prev, search: query })); 
    }
  }, [query]); 

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => {
      const newFilters = { ...prev, [name]: value }; 
      localStorage.setItem('filters', JSON.stringify(newFilters));
      console.log("losfiltros") 
      console.log(newFilters)
      console.log(filters)
      return newFilters; 
    });
  };

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

  const years = [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 
    2013, 2012, 2011, 2010, '2000s', '1990s', '1980s', '1970s']

  return (
    <div>
      <Header />
      <main className="p-4">
        <h2 className="mt-8 text-3xl font-bold text-center mb-6">Todos los Juegos</h2>

        <div className="mb-6 flex flex-wrap gap-4 justify-center">
          <select name="genre" value={filters.genre} onChange={handleFilterChange} className="p-2 border rounded">
            <option value="">Todos los géneros</option>
            {loadinggenres ? (
            <option disabled>Cargando géneros...</option> // Muestra este mensaje mientras se cargan los géneros
            ) : (
            allGenres.map((genre) => (
              <option key={genre.name} value={genre.name}> {/* Asegúrate de usar genre.id como valor */}
                {genre.name} {/* Muestra el nombre del género */}
              </option>
            ))
            )}
          </select>
          <select name="metacritic" value={filters.metacritic} onChange={handleFilterChange} className="p-2 border rounded">
            <option value="0">Todas las puntuaciones</option>
            <option value="81">81-100</option>
            <option value="61">61-80</option>
            <option value="41">41-60</option>
            <option value="21">21-40</option>
            <option value="1">0-20</option>
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
            <div className="container mt-12 mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
                  {allGames.map((game) => (
                    <div className="w-full max-w-[280px] mx-auto sm:max-w-none" key={game.id}>
                      <GameCard
                        id={game.id}
                        title={game.name}
                        image={game.background_image}
                        description={game.description || game.description_raw || "No description available"}
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex justify-center items-center gap-4">{/* Contenido de la paginación */}</div>
              </div>
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

