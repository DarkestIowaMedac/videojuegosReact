"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Header from "../components/Header"
import Footer from "../components/Footer"
import EventCard from "../components/EventCard"
import { loadRegisteredEvents } from "../store/slices/eventsSlice"

const EventsPage = () => {
  const dispatch = useDispatch()
  const { events, registeredEvents } = useSelector((state) => state.events)

  useEffect(() => {
    dispatch(loadRegisteredEvents())
  }, [dispatch])

  return (
    <div>
      <Header />
      <main className="p-4">
        <section className="my-8">
          <h2 className="text-3xl text-white font-bold text-center mb-6">Eventos de Videojuegos</h2>
          <p className="text-center oscuroletras mb-8 max-w-2xl mx-auto">
            Descubre los eventos más importantes de la industria de los videojuegos. Mantente al día con las últimas
            novedades, anuncios y oportunidades para conocer a desarrolladores y otros jugadores.
          </p>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {events.map((event) => (
                <EventCard
                  key={event.id}
                  id={event.id}
                  title={event.title}
                  date={event.date}
                  location={event.location}
                  image={event.image}
                  description={event.description}
                  isRegistered={registeredEvents.includes(event.id)}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="my-16 bg-gray-800 py-12 rounded-lg">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h3 className="text-2xl font-bold mb-4">¿Organizas un evento de gaming?</h3>
            <p className="mb-6">
              Si estás organizando un evento relacionado con videojuegos y quieres que aparezca en nuestra página,
              contáctanos para obtener más información.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300">
              Contactar
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default EventsPage

