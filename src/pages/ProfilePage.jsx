"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Header from "../components/Header"
import GameCard from "../components/GameCard"
import Footer from "../components/Footer"
import EventCard from "../components/EventCard"
import { loadFavorites, setActiveTab } from "../store/slices/userSlice"
import { loadRegisteredEvents } from "../store/slices/eventsSlice"

const ProfilePage = () => {
  const dispatch = useDispatch()
  const { activeTab, favorites } = useSelector((state) => state.user)
  const { events, registeredEvents } = useSelector((state) => state.events)

  useEffect(() => {
    dispatch(loadFavorites())
    dispatch(loadRegisteredEvents())
  }, [dispatch])

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
              onClick={() => dispatch(setActiveTab("events"))}
            >
              Mis Eventos
            </button>
            <button
              className={`py-2 px-4 font-medium text-sm flex-1 text-center ${
                activeTab === "favorites"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-purple-300 hover:text-purple-600"
              }`}
              onClick={() => dispatch(setActiveTab("favorites"))}
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

