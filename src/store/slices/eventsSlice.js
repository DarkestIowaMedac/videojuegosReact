import { createSlice } from "@reduxjs/toolkit"

const eventsSlice = createSlice({
  name: "events",
  initialState: {
    events: [
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
    ],
    registeredEvents: [],
    currentEvent: null,
    loading: false,
    error: null,
  },
  reducers: {
    loadRegisteredEvents: (state) => {
      const registeredEvents = JSON.parse(localStorage.getItem("registeredEvents")) || []
      state.registeredEvents = registeredEvents
    },
    registerForEvent: (state, action) => {
      const eventId = action.payload
      if (!state.registeredEvents.includes(eventId)) {
        state.registeredEvents.push(eventId)
        localStorage.setItem("registeredEvents", JSON.stringify(state.registeredEvents))
      }
    },
    unregisterFromEvent: (state, action) => {
      const eventId = action.payload
      state.registeredEvents = state.registeredEvents.filter((id) => id !== eventId)
      localStorage.setItem("registeredEvents", JSON.stringify(state.registeredEvents))
    },
    toggleEventRegistration: (state, action) => {
      const eventId = action.payload
      if (state.registeredEvents.includes(eventId)) {
        state.registeredEvents = state.registeredEvents.filter((id) => id !== eventId)
      } else {
        state.registeredEvents.push(eventId)
      }
      localStorage.setItem("registeredEvents", JSON.stringify(state.registeredEvents))
    },
    setCurrentEvent: (state, action) => {
      state.currentEvent = action.payload
    },
  },
})

export const { loadRegisteredEvents, registerForEvent, unregisterFromEvent, toggleEventRegistration, setCurrentEvent } =
  eventsSlice.actions
export default eventsSlice.reducer

