"use client"

import { useState, useEffect } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import EventCard from "../components/EventCard"

const EventsPage = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([
    {
      id: 1,
      title: "E3 2024",
      date: "12-15 Junio, 2024",
      location: "Los Angeles, CA",
      image: "/images1.jpg?height=200&width=350",
      description: "La mayor exposición de videojuegos del mundo regresa con anuncios exclusivos y demos jugables.",
    },
    {
      id: 2,
      title: "Gamescom 2024",
      date: "21-25 Agosto, 2024",
      location: "Colonia, Alemania",
      image: "/images2.jpg?height=200&width=350",
      description: "La feria de videojuegos más grande de Europa con cientos de expositores y novedades.",
    },
    {
      id: 3,
      title: "Tokyo Game Show 2024",
      date: "26-29 Septiembre, 2024",
      location: "Tokio, Japón",
      image: "/images3.jpg?height=200&width=350",
      description: "Descubre las últimas novedades de los desarrolladores japoneses y asiáticos.",
    },
    {
      id: 4,
      title: "PAX East 2024",
      date: "23-26 Marzo, 2024",
      location: "Boston, MA",
      image: "/images4.png?height=200&width=350",
      description: "Festival de juegos para todos los públicos con paneles, torneos y zona de exposición.",
    },
    {
      id: 5,
      title: "BlizzCon 2024",
      date: "1-2 Noviembre, 2024",
      location: "Anaheim, CA",
      image: "/images5.jpg?height=200&width=350",
      description: "La convención anual de Blizzard Entertainment con anuncios de sus franquicias más populares.",
    },
    {
      id: 6,
      title: "Game Awards 2024",
      date: "12 Diciembre, 2024",
      location: "Los Angeles, CA",
      image: "/images6.jpg?height=200&width=350",
      description: "La ceremonia anual de premios que celebra lo mejor de la industria de los videojuegos.",
    },
    {
      id: 7,
      title: "Indie Game Festival",
      date: "18-20 Julio, 2024",
      location: "San Francisco, CA",
      image: "/images7.jpg?height=200&width=350",
      description: "Celebración de los juegos independientes con premios, charlas y oportunidades de networking.",
    },
    {
      id: 8,
      title: "GameDev Conference",
      date: "4-8 Marzo, 2024",
      location: "San Francisco, CA",
      image: "/images8.png?height=200&width=350",
      description: "La conferencia más importante para desarrolladores de videojuegos con talleres y charlas.",
    },
  ])

  const [registeredEvents, setRegisteredEvents] = useState([])

  useEffect(() => {
    const storedEvents = localStorage.getItem("registeredEvents")
    if (storedEvents) {
      setRegisteredEvents(JSON.parse(storedEvents))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("registeredEvents", JSON.stringify(registeredEvents))
  }, [registeredEvents])

  const toggleEventRegistration = (eventId) => {
    setRegisteredEvents((prevRegisteredEvents) => {
      if (prevRegisteredEvents.includes(eventId)) {
        return prevRegisteredEvents.filter((id) => id !== eventId)
      } else {
        return [...prevRegisteredEvents, eventId]
      }
    })
  }

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
              {upcomingEvents.map((event) => (
                <EventCard
                  key={event.id}
                  id={event.id}
                  title={event.title}
                  date={event.date}
                  location={event.location}
                  image={event.image}
                  description={event.description}
                  isRegistered={registeredEvents.includes(event.id)}
                  onToggleRegistration={toggleEventRegistration}
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

