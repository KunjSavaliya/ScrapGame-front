// src/Redux/topFreeGameSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTopFreeGames = createAsyncThunk('games/fetchTopFreeGames', async () => {
  try {
    const response = await fetch('http://localhost:3012/api/users/scrape-topfreegame');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log("F=====:", data);
    return data; // Ensure this returns data structured correctly for your state
    console.log("data",data);
    
  } catch (error) {
    console.error("Error fetching games:", error);
    throw error; // This will trigger the rejected case in the slice
  }
});


const topFreeGameSlice = createSlice({
  name: 'TopFreegame',
  initialState: {
    TopFreegame: [],
    loading: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopFreeGames.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTopFreeGames.fulfilled, (state, action) => {
        state.loading = false;
        state.TopFreegame = action.payload; // Adjust based on the structure of the payload
      })
      .addCase(fetchTopFreeGames.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Capture any errors
      });
  },
});

export default topFreeGameSlice.reducer;
