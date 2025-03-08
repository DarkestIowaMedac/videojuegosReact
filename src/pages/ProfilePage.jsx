"use client"

import { useEffect, useState } from "react"
import Header from "../components/Header"
import GameCard from "../components/GameCard"
import Footer from "../components/Footer"
import EventCard from "../components/EventCard"
const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("events")
  const [favorites, setFavorites] = useState([])
  const [registeredEvents, setRegisteredEvents] = useState([])
  const [events, setEvents] = useState([])

  useEffect(() => {
    const loadFavorites = () => {
      const favs = JSON.parse(localStorage.getItem("favs")) || []
      setFavorites(favs)
    }

    const loadRegisteredEvents = () => {
      const registeredIds = JSON.parse(localStorage.getItem("registeredEvents")) || []
      setRegisteredEvents(registeredIds)

      const allEvents = [
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
      ]

      setEvents(allEvents)
    }

    loadFavorites()
    loadRegisteredEvents()

    window.addEventListener("favoritesChanged", loadFavorites)
    window.addEventListener("storage", (e) => {
      if (e.key === "registeredEvents") {
        loadRegisteredEvents()
      }
    })

    return () => {
      window.removeEventListener("favoritesChanged", loadFavorites)
      window.removeEventListener("storage", loadRegisteredEvents)
    }
  }, [])

  const toggleEventRegistration = (eventId) => {
    setRegisteredEvents((prevRegisteredEvents) => {
      let newRegisteredEvents
      if (prevRegisteredEvents.includes(eventId)) {
        newRegisteredEvents = prevRegisteredEvents.filter((id) => id !== eventId)
      } else {
        newRegisteredEvents = [...prevRegisteredEvents, eventId]
      }

      localStorage.setItem("registeredEvents", JSON.stringify(newRegisteredEvents))
      window.dispatchEvent(new Event("storage"))

      return newRegisteredEvents
    })
  }

  const userEvents = events.filter((event) => registeredEvents.includes(event.id))

  return (
    <div>
      <Header />
      <main className="p-4">
        <h1 className="mt-8 text-4xl font-bold text-center mb-8">Mi Perfil</h1>

        {/* Tabs Navigation */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="flex border-b border-gray-200">
            
            <button
              className={`py-2 px-4 font-medium text-sm flex-1 text-center ${
                activeTab === "events"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-purple-300 hover:text-purple-600"
              }`}
              onClick={() => setActiveTab("events")}
            >
              Mis Eventos
            </button>
            <button
              className={`py-2 px-4 font-medium text-sm flex-1 text-center ${
                activeTab === "favorites"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-purple-300 hover:text-purple-600"
              }`}
              onClick={() => setActiveTab("favorites")}
            >
              Mis Juegos Favoritos
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          {activeTab === "favorites" && (
            <>
              {favorites.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <p className="text-gray-500 mb-4">No tienes juegos favoritos guardados.</p>
                  <a href="/games" className="text-blue-600 hover:underline">
                    Explorar juegos
                  </a>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                  {favorites.map((game) => (
                    <div className="w-full max-w-[280px] mx-auto sm:max-w-none" key={game.id}>
                      <GameCard id={game.id} title={game.title} image={game.image} description="" />
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {activeTab === "events" && (
            <>
              {userEvents.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <p className="text-gray-500 mb-4">No te has registrado a ningún evento.</p>
                  <a href="/events" className="text-blue-600 hover:underline">
                    Ver eventos disponibles
                  </a>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {userEvents.map((event) => (
                    <EventCard
                      key={event.id}
                      id={event.id}
                      title={event.title}
                      date={event.date}
                      location={event.location}
                      image={event.image}
                      description={event.description}
                      isRegistered={true}
                      onToggleRegistration={toggleEventRegistration}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default ProfilePage

