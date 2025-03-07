"use client"

import { useState } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"

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

  return (
    <div>
      <Header />
      <main className="p-4">
        <section className="my-8">
          <h2 className="text-3xl font-bold text-center mb-6">Eventos de Videojuegos</h2>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
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
                />
              ))}
            </div>
          </div>
        </section>

        <section className="my-16 bg-gray-100 py-12 rounded-lg">
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

const EventCard = ({ id, title, date, location, image, description }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="h-48 overflow-hidden relative group">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <button
          className="absolute top-2 right-2 bg-white bg-opacity-80 p-1.5 rounded-full hover:bg-opacity-100 transition-all duration-200"
          aria-label="Añadir a favoritos"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5 text-yellow-500"
          >
            <path
              fillRule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2 truncate">{title}</h3>
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
          <span>{date}</span>
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{location}</span>
        </div>
        <p className="text-gray-700 mb-4 line-clamp-3">{description}</p>
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300">
          Apuntarse
        </button>
      </div>
    </div>
  )
}

export default EventsPage

