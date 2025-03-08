import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
  name: "user",
  initialState: {
    favorites: [],
    activeTab: "events",
  },
  reducers: {
    loadFavorites: (state) => {
      const favs = JSON.parse(localStorage.getItem("favs")) || []
      state.favorites = favs
    },
    addFavorite: (state, action) => {
      const { id, title, image } = action.payload
      if (!state.favorites.some((fav) => fav.id === id)) {
        state.favorites.push({ id, title, image })
        localStorage.setItem("favs", JSON.stringify(state.favorites))
      }
    },
    removeFavorite: (state, action) => {
      const id = action.payload
      state.favorites = state.favorites.filter((fav) => fav.id !== id)
      localStorage.setItem("favs", JSON.stringify(state.favorites))
    },
    toggleFavorite: (state, action) => {
      const { id, title, image } = action.payload
      const existingIndex = state.favorites.findIndex((fav) => fav.id === id)

      if (existingIndex >= 0) {
        state.favorites.splice(existingIndex, 1)
      } else {
        state.favorites.push({ id, title: title || "", image })
      }

      localStorage.setItem("favs", JSON.stringify(state.favorites))
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload
    },
  },
})

export const { loadFavorites, addFavorite, removeFavorite, toggleFavorite, setActiveTab } = userSlice.actions
export default userSlice.reducer

