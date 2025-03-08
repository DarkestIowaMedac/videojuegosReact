"use client"

import { useState } from "react"

import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { setCurrentEvent, registerForEvent } from "../store/slices/eventsSlice"

const EventsJoinPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { currentEvent, registeredEvents } = useSelector((state) => state.events)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const registerForEventFromUrl = () => {
      try {
        const urlParams = new URLSearchParams(window.location.search)
        const eventDataParam = urlParams.get("eventData")

        if (!eventDataParam) {
          throw new Error("No se encontraron datos del evento")
        }

        const eventData = JSON.parse(eventDataParam)
        dispatch(setCurrentEvent(eventData))

        if (!registeredEvents.includes(eventData.id)) {
          dispatch(registerForEvent(eventData.id))
        }

        setLoading(false)
      } catch (err) {
        console.error("Error al procesar el evento:", err)
        setError("No se pudo procesar la información del evento. Por favor, intenta de nuevo.")
        setLoading(false)
      }
    }

    registerForEventFromUrl()
  }, [dispatch, registeredEvents])

  const handleGoToEvents = () => {
    navigate("/events")
  }

  const handleGoToProfile = () => {
    navigate("/profile")
  }

  if (loading) {
    return (
      <div>
        <Header />
        <main className="p-4 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-xl">Procesando registro...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <Header />
        <main className="p-4 min-h-screen flex items-center justify-center">
          <div className="text-center max-w-md mx-auto bg-red-50 p-6 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-red-500 mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h2 className="text-2xl font-bold mb-2">Error</h2>
            <p className="mb-4">{error}</p>
            <button
              onClick={handleGoToEvents}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Ver eventos disponibles
            </button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div>
      <Header />
      <main className="p-4 min-h-screen">
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md mt-8">
          <div className="text-center mb-6">
            <div className="bg-green-100 inline-block p-3 rounded-full mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-2">¡Te has unido al evento!</h1>
            <p className="text-gray-600">Has sido registrado correctamente en el evento.</p>
          </div>

          {currentEvent && (
            <div className="mb-8">
              <div className="h-48 overflow-hidden rounded-lg mb-4">
                <img
                  src={currentEvent.image || "/placeholder.svg"}
                  alt={currentEvent.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-2xl font-bold mb-2">{currentEvent.title}</h2>
              <div className="flex items-center text-gray-600 mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>{currentEvent.date}</span>
              </div>
              <div className="flex items-center text-gray-600 mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>{currentEvent.location}</span>
              </div>
              <p className="text-gray-700">{currentEvent.description}</p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleGoToProfile}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
            >
              Ver mis eventos
            </button>
            <button
              onClick={handleGoToEvents}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-6 rounded"
            >
              Explorar más eventos
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default EventsJoinPage

