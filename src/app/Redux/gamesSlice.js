// src/Redux/gamesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchGames = createAsyncThunk('games/fetchGames', async () => {
  try {
    const response = await fetch('http://localhost:3012/api/users/scrape');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log("Fetched data:", data);
    return data; // Ensure this returns data structured correctly for your state
  } catch (error) {
    console.error("Error fetching games:", error);
    throw error; // This will trigger the rejected case in the slice
  }
});


const gamesSlice = createSlice({
  name: 'games',
  initialState: {
    games: [],
    loading: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGames.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGames.fulfilled, (state, action) => {
        state.loading = false;
        state.games = action.payload; // Adjust based on the structure of the payload
      })
      .addCase(fetchGames.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Capture any errors
      });
  },
});

export default gamesSlice.reducer;
