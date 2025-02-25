"use client"

import { useEffect, useState, useCallback } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import ArrowButton from "../components/ArrowButton"
import PublisherCard from "../components/PublisherCard"
import { fetchPublishers } from "../services/api"

const AllPublishersPage = () => {
  const [publishers, setPublishers] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const loadPublishers = async () => {
    setLoading(true)
    try {
      const data = await fetchPublishers(currentPage)
      setPublishers(data.results)
      setTotalPages(Math.ceil(data.count / 40))
    } catch (error) {
      console.error("Error loading publishers:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPublishers()
  }, [])

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow p-4">
        <h2 className="mt-8 text-3xl font-bold text-center mb-6">Distribuidoras de Videojuegos</h2>

        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            <div className="container mt-12 mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                  {publishers.map((publisher) => (
                    <PublisherCard
                      key={publisher.id}
                      id={publisher.id}
                      name={publisher.name}
                      image={publisher.image_background}
                      gamesCount={publisher.games_count}
                      description={publisher.description}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-8 flex justify-center items-center gap-4">
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

export default AllPublishersPage

