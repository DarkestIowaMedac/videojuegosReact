"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Header from "../components/Header"
import Carousel from "../components/Carousel"
import GameCard from "../components/GameCard"
import Footer from "../components/Footer"
import { fetchRecentGamesAsync, fetchBetterGamesAsync } from "../store/slices/gamesSlice"
import { clearFilters } from "../store/slices/filtersSlice"

const HomePage = () => {
  const dispatch = useDispatch()
  const { recentGames, betterGames, loading } = useSelector((state) => ({
    recentGames: state.games.recentGames,
    betterGames: state.games.betterGames,
    loading: {
      recentGames: state.games.loading.recentGames,
      betterGames: state.games.loading.betterGames,
    },
  }))

  useEffect(() => {
    localStorage.setItem("search", "games")
    dispatch(clearFilters())
    dispatch(fetchRecentGamesAsync())
    dispatch(fetchBetterGamesAsync())
  }, [dispatch])

  return (
    <div>
      <Header />
      <main className="p-4">
        <section className="my-8">
          <h2 className="text-2xl font-bold text-center mb-4">Juegos Destacados</h2>
          {loading.betterGames ? <h2>Cargando juegos...</h2> : <Carousel games={betterGames} />}
        </section>

        <section className="my-8">
          <h2 className="text-2xl font-bold text-center mb-4">Juegos Recientes</h2>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {loading.recentGames ? (
                <h2 className="text-center col-span-full">Cargando juegos...</h2>
              ) : (
                recentGames.map((game) => (
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
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default HomePage

