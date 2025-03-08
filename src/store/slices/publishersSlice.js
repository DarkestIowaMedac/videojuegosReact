import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { fetchPublishers, fetchPublisherDetails, fetchPublisherGames } from "../../services/api"

export const fetchPublishersAsync = createAsyncThunk(
  "publishers/fetchPublishers",
  async ({ page, query }, { rejectWithValue }) => {
    try {
      const response = await fetchPublishers(page, query)
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

export const fetchPublisherDetailsAsync = createAsyncThunk(
  "publishers/fetchPublisherDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetchPublisherDetails(id)
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

export const fetchPublisherGamesAsync = createAsyncThunk(
  "publishers/fetchPublisherGames",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetchPublisherGames(id)
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

const publishersSlice = createSlice({
  name: "publishers",
  initialState: {
    publishers: [],
    publisherDetails: null,
    publisherGames: [],
    loading: {
      publishers: false,
      publisherDetails: false,
      publisherGames: false,
    },
    error: {
      publishers: null,
      publisherDetails: null,
      publisherGames: null,
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
      // fetchPublishersAsync
      .addCase(fetchPublishersAsync.pending, (state) => {
        state.loading.publishers = true
        state.error.publishers = null
      })
      .addCase(fetchPublishersAsync.fulfilled, (state, action) => {
        state.loading.publishers = false
        state.publishers = action.payload.results
        state.totalPages = Math.ceil(action.payload.count / 40)
      })
      .addCase(fetchPublishersAsync.rejected, (state, action) => {
        state.loading.publishers = false
        state.error.publishers = action.payload
      })

      // fetchPublisherDetailsAsync
      .addCase(fetchPublisherDetailsAsync.pending, (state) => {
        state.loading.publisherDetails = true
        state.error.publisherDetails = null
      })
      .addCase(fetchPublisherDetailsAsync.fulfilled, (state, action) => {
        state.loading.publisherDetails = false
        state.publisherDetails = action.payload
      })
      .addCase(fetchPublisherDetailsAsync.rejected, (state, action) => {
        state.loading.publisherDetails = false
        state.error.publisherDetails = action.payload
      })

      // fetchPublisherGamesAsync
      .addCase(fetchPublisherGamesAsync.pending, (state) => {
        state.loading.publisherGames = true
        state.error.publisherGames = null
      })
      .addCase(fetchPublisherGamesAsync.fulfilled, (state, action) => {
        state.loading.publisherGames = false
        state.publisherGames = action.payload
      })
      .addCase(fetchPublisherGamesAsync.rejected, (state, action) => {
        state.loading.publisherGames = false
        state.error.publisherGames = action.payload
      })
  },
})

export const { setCurrentPage } = publishersSlice.actions
export default publishersSlice.reducer

