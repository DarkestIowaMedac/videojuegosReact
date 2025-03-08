"use client"

import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import Header from "../components/Header"
import GameCard from "../components/GameCard"
import Footer from "../components/Footer"
import ArrowButton from "../components/ArrowButton"
import TagSearch from "../components/TagSearch"
import SelectedTags from "../components/SelectedTags"
import { fetchGamesAsync, setCurrentPage, fetchGenresAsync } from "../store/slices/gamesSlice"
import {
  addTag,
  removeTag,
  setGenre,
  setMetacritic,
  setYear,
  setSort,
  saveFiltersToLocalStorage,
  setSearch,
  setFilters,
} from "../store/slices/filtersSlice"

const AllGamesPage = () => {
  const { query } = useParams()
  const dispatch = useDispatch()

  // Ref para controlar si ya se ha hecho la petición inicial
  const initialFetchDone = useRef(false)

  const { allGames, genres, currentPage, totalPages, loading } = useSelector((state) => ({
    allGames: state.games.allGames,
    genres: state.games.genres,
    currentPage: state.games.currentPage,
    totalPages: state.games.totalPages,
    loading: {
      allGames: state.games.loading.allGames,
      genres: state.games.loading.genres,
    },
  }))

  const filters = useSelector((state) => state.filters)
  const selectedTags = useSelector((state) => state.filters.selectedTags)

  // Efecto para la carga inicial - solo se ejecuta una vez
  useEffect(() => {
    const initialize = async () => {
      try {
        // Configuración básica
        localStorage.setItem("search", "games")

        // Cargar filtros directamente desde localStorage para asegurar que tenemos los datos correctos
        const savedFilters = JSON.parse(localStorage.getItem("filters")) || {}
        console.log("Filtros cargados directamente desde localStorage:", savedFilters)

        // Aplicar los filtros guardados al estado de Redux
        await dispatch(setFilters(savedFilters))

        // Si hay query en la URL, actualizar el filtro de búsqueda
        if (query) {
          await dispatch(setSearch(query))
        }

        // Cargar géneros (puede ocurrir en paralelo)
        dispatch(fetchGenresAsync())

        // Hacer UNA ÚNICA petición con los filtros ya cargados
        await dispatch(fetchGamesAsync({ page: currentPage }))

        // Marcar que ya se ha hecho la petición inicial
        initialFetchDone.current = true
      } catch (error) {
        console.error("Error durante la inicialización:", error)
        // Incluso si hay un error, marcamos como inicializado para evitar bucles
        initialFetchDone.current = true
      }
    }

    // Solo ejecutar la inicialización si no se ha hecho ya la petición inicial
    if (!initialFetchDone.current) {
      initialize()
    }
  }, []) // Dependencias vacías intencionalmente para que solo se ejecute una vez

  // Efecto para manejar cambios en filtros o página - solo se ejecuta después de la inicialización
  useEffect(() => {
    // Solo ejecutar este efecto si ya se ha hecho la petición inicial
    // Y si hay cambios en los filtros o la página (no durante la carga inicial)
    if (initialFetchDone.current) {
      dispatch(saveFiltersToLocalStorage())
      dispatch(fetchGamesAsync({ page: currentPage }))
    }
  }, [dispatch, currentPage, filters])

  // Efecto para manejar cambios en la query de la URL
  useEffect(() => {
    if (initialFetchDone.current && query) {
      dispatch(setSearch(query))
    }
  }, [dispatch, query])

  const handleTagSelect = (tag) => {
    dispatch(addTag(tag))
  }

  const handleRemoveTag = (tagId) => {
    dispatch(removeTag(tagId))
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target

    switch (name) {
      case "genre":
        dispatch(setGenre(value))
        break
      case "metacritic":
        dispatch(setMetacritic(value))
        break
      case "year":
        dispatch(setYear(value))
        break
      case "sort":
        dispatch(setSort(value))
        break
      default:
        break
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1))
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(setCurrentPage(currentPage + 1))
    }
  }

  const years = [
    2025,
    2024,
    2023,
    2022,
    2021,
    2020,
    2019,
    2018,
    2017,
    2016,
    2015,
    2014,
    2013,
    2012,
    2011,
    2010,
    "2000s",
    "1990s",
    "1980s",
    "1970s",
  ]

  return (
    <div>
      <Header />
      <main className="p-4">
        <h2 className="mt-8 text-3xl font-bold text-center mb-6">Todos los Juegos</h2>

        <div className="mb-6 flex flex-wrap gap-4 justify-center">
          <div className="w-full max-w-xs mx-auto">
            <TagSearch onTagSelect={handleTagSelect} selectedTags={selectedTags} />
            <SelectedTags tags={selectedTags} onRemoveTag={handleRemoveTag} />
          </div>
          <select
            name="genre"
            value={filters.genre}
            onChange={handleFilterChange}
            className="h-10 text-black p-2 border rounded"
          >
            <option value="">Todos los géneros</option>
            {loading.genres ? (
              <option disabled>Cargando géneros...</option>
            ) : (
              genres.map((genre) => (
                <option className="h-10 text-black" key={genre.name} value={genre.name}>
                  {genre.name}
                </option>
              ))
            )}
          </select>
          <select
            name="metacritic"
            value={filters.metacritic}
            onChange={handleFilterChange}
            className="h-10 p-2 border rounded"
          >
            <option value="0">Todas las puntuaciones</option>
            <option value="81">81-100</option>
            <option value="61">61-80</option>
            <option value="41">41-60</option>
            <option value="21">21-40</option>
            <option value="1">0-20</option>
          </select>
          <select name="year" value={filters.year} onChange={handleFilterChange} className="h-10 p-2 border rounded">
            <option value="">Todos los años</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <select name="sort" value={filters.sort} onChange={handleFilterChange} className="h-10 p-2 border rounded">
            <option value="alphabetical">Ordenar por: Alfabético</option>
            <option value="release_date">Fecha de lanzamiento</option>
            <option value="rating">Valoración</option>
          </select>
        </div>

        {loading.allGames ? (
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

