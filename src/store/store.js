import { configureStore } from "@reduxjs/toolkit"
import gamesReducer from "./slices/gamesSlice"
import filtersReducer from "./slices/filtersSlice"
import publishersReducer from "./slices/publishersSlice"
import eventsReducer from "./slices/eventsSlice"
import userReducer from "./slices/userSlice"

export const store = configureStore({
  reducer: {
    games: gamesReducer,
    filters: filtersReducer,
    publishers: publishersReducer,
    events: eventsReducer,
    user: userReducer,
  },
})

export default store

