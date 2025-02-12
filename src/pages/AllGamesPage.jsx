"use client"

import { useEffect, useState } from "react"
import Header from "../components/Header"
import GameCard from "../components/GameCard"
import Footer from "../components/Footer"
import ArrowButton from "../components/ArrowButton"

const AllGamesPage = () => {
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

  const apiKey = "e145f66352074fd2900cce478881b8a7"

  const fetchAllGames = async (page = 1) => {
    setLoading(true)
    try {
      const response = await fetch(
        `https://api.rawg.io/api/games?key=${apiKey}&page=${page}&page_size=40&ordering=name&search_precise=true&search=a,b,c,d,e,f,g,h,i,j,k,l,m,n,ñ,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,Ñ,O,P,Q,R,S,T,U,V,W,X,Y,Z,Á,É,Í,Ó,Ú,á,é,í,ó,ú,0,1,2,3,4,5,6,7,8,9,?,¿,¡,!,+,',],[,@,#,~,€,¬,.,-,_,(,),/,|,*,"`,
      )
      if (!response.ok) {
        throw new Error("Error en la solicitud a la API")
      }
      const data = await response.json()
      setAllGames(data.results)
      setFilteredGames(data.results)
      setTotalPages(Math.ceil(data.count / 40))
      setCurrentPage(page)
    } catch (error) {
      console.error("Error fetching games:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAllGames()
  }, []) 

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
      fetchAllGames(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      fetchAllGames(currentPage + 1)
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
                //key={game.id}
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

