import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { fetchTags } from "../../services/api"

export const fetchTagsAsync = createAsyncThunk("filters/fetchTags", async (searchQuery, { rejectWithValue }) => {
  try {
    const response = await fetchTags(searchQuery)
    return response
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    search: "",
    tags: [],
    selectedTags: [],
    genre: "",
    metacritic: 0,
    year: "",
    sort: "alphabetical",
    availableTags: [],
    loading: false,
    error: null,
    initialized: false,
  },
  reducers: {
    setFilters: (state, action) => {
      return { ...state, ...action.payload }
    },
    addTag: (state, action) => {
      if (!state.selectedTags.some((tag) => tag.id === action.payload.id)) {
        state.selectedTags.push(action.payload)
        state.tags = state.selectedTags
      }
    },
    removeTag: (state, action) => {
      state.selectedTags = state.selectedTags.filter((tag) => tag.id !== action.payload)
      state.tags = state.selectedTags
    },
    setSearch: (state, action) => {
      state.search = action.payload
    },
    setGenre: (state, action) => {
      state.genre = action.payload
    },
    setMetacritic: (state, action) => {
      state.metacritic = action.payload
    },
    setYear: (state, action) => {
      state.year = action.payload
    },
    setSort: (state, action) => {
      state.sort = action.payload
    },
    loadFiltersFromLocalStorage: (state) => {
      try {
        const savedFilters = JSON.parse(localStorage.getItem("filters")) || {}

        // Cargar tags
        if (savedFilters.tags) {
          state.tags = savedFilters.tags
          state.selectedTags = Array.isArray(savedFilters.tags) ? savedFilters.tags : [savedFilters.tags]
        }

        // Cargar otros filtros
        if (savedFilters.genre) state.genre = savedFilters.genre
        if (savedFilters.metacritic) state.metacritic = savedFilters.metacritic
        if (savedFilters.year) state.year = savedFilters.year
        if (savedFilters.sort) state.sort = savedFilters.sort

        console.log("Filtros cargados desde localStorage:", state)
      } catch (error) {
        console.error("Error al cargar filtros desde localStorage:", error)
      }
    },
    saveFiltersToLocalStorage: (state) => {
      try {
        localStorage.setItem(
          "filters",
          JSON.stringify({
            tags: state.tags,
            genre: state.genre,
            metacritic: state.metacritic,
            year: state.year,
            sort: state.sort,
          }),
        )
      } catch (error) {
        console.error("Error al guardar filtros en localStorage:", error)
      }
    },
    clearFilters: (state) => {
      state.search = ""
      state.tags = []
      state.selectedTags = []
      state.genre = ""
      state.metacritic = 0
      state.year = ""
      state.sort = "alphabetical"
      localStorage.removeItem("filters")
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTagsAsync.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTagsAsync.fulfilled, (state, action) => {
        state.loading = false
        state.availableTags = action.payload
      })
      .addCase(fetchTagsAsync.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const {
  setFilters,
  addTag,
  removeTag,
  setSearch,
  setGenre,
  setMetacritic,
  setYear,
  setSort,
  loadFiltersFromLocalStorage,
  saveFiltersToLocalStorage,
  clearFilters,
} = filtersSlice.actions
export default filtersSlice.reducer



