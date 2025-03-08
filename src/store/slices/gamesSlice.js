import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { fetchAllGames, fetchRecentGames, fetchBetterGames, fetchGameDetails, fetchGenres } from "../../services/api"

// Thunk para cargar juegos
export const fetchGamesAsync = createAsyncThunk(
  "games/fetchGames",
  async ({ page, filters }, { getState, rejectWithValue }) => {
    try {
      // Asegurarnos de usar los filtros más actualizados
      const currentFilters = filters || getState().filters
      console.log("Realizando petición con filtros:", currentFilters)

      const response = await fetchAllGames(page, currentFilters)
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

export const fetchRecentGamesAsync = createAsyncThunk("games/fetchRecentGames", async (_, { rejectWithValue }) => {
  try {
    const response = await fetchRecentGames()
    return response
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const fetchBetterGamesAsync = createAsyncThunk("games/fetchBetterGames", async (_, { rejectWithValue }) => {
  try {
    const response = await fetchBetterGames()
    return response
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const fetchGameDetailsAsync = createAsyncThunk("games/fetchGameDetails", async (id, { rejectWithValue }) => {
  try {
    const response = await fetchGameDetails(id)
    return response
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const fetchGenresAsync = createAsyncThunk("games/fetchGenres", async (_, { rejectWithValue }) => {
  try {
    const response = await fetchGenres()
    return response
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

const gamesSlice = createSlice({
  name: "games",
  initialState: {
    allGames: [],
    recentGames: [],
    betterGames: [],
    gameDetails: null,
    genres: [],
    loading: {
      allGames: false,
      recentGames: false,
      betterGames: false,
      gameDetails: false,
      genres: false,
    },
    error: {
      allGames: null,
      recentGames: null,
      betterGames: null,
      gameDetails: null,
      genres: null,
    },
    currentPage: 1,
    totalPages: 1,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchGamesAsync
      .addCase(fetchGamesAsync.pending, (state) => {
        state.loading.allGames = true
        state.error.allGames = null
      })
      .addCase(fetchGamesAsync.fulfilled, (state, action) => {
        state.loading.allGames = false
        state.allGames = action.payload.results
        state.totalPages = Math.ceil(action.payload.count / 40)
      })
      .addCase(fetchGamesAsync.rejected, (state, action) => {
        state.loading.allGames = false
        state.error.allGames = action.payload
      })

      // fetchRecentGamesAsync
      .addCase(fetchRecentGamesAsync.pending, (state) => {
        state.loading.recentGames = true
        state.error.recentGames = null
      })
      .addCase(fetchRecentGamesAsync.fulfilled, (state, action) => {
        state.loading.recentGames = false
        state.recentGames = action.payload
      })
      .addCase(fetchRecentGamesAsync.rejected, (state, action) => {
        state.loading.recentGames = false
        state.error.recentGames = action.payload
      })

      // fetchBetterGamesAsync
      .addCase(fetchBetterGamesAsync.pending, (state) => {
        state.loading.betterGames = true
        state.error.betterGames = null
      })
      .addCase(fetchBetterGamesAsync.fulfilled, (state, action) => {
        state.loading.betterGames = false
        state.betterGames = action.payload
      })
      .addCase(fetchBetterGamesAsync.rejected, (state, action) => {
        state.loading.betterGames = false
        state.error.betterGames = action.payload
      })

      // fetchGameDetailsAsync
      .addCase(fetchGameDetailsAsync.pending, (state) => {
        state.loading.gameDetails = true
        state.error.gameDetails = null
      })
      .addCase(fetchGameDetailsAsync.fulfilled, (state, action) => {
        state.loading.gameDetails = false
        state.gameDetails = action.payload
      })
      .addCase(fetchGameDetailsAsync.rejected, (state, action) => {
        state.loading.gameDetails = false
        state.error.gameDetails = action.payload
      })

      // fetchGenresAsync
      .addCase(fetchGenresAsync.pending, (state) => {
        state.loading.genres = true
        state.error.genres = null
      })
      .addCase(fetchGenresAsync.fulfilled, (state, action) => {
        state.loading.genres = false
        state.genres = action.payload
      })
      .addCase(fetchGenresAsync.rejected, (state, action) => {
        state.loading.genres = false
        state.error.genres = action.payload
      })
  },
})

export const { setCurrentPage } = gamesSlice.actions
export default gamesSlice.reducer

