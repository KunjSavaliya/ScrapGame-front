// src/Redux/CasualGameSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCasualGame = createAsyncThunk('games/fetchscrapecasualGame', async () => {
  try {
    const response = await fetch('http://localhost:3012/api/users/scrape-casualgame');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log("F=====:", data);
    return data; // Ensure this returns data structured correctly for your state
    
  } catch (error) {
    console.error("Error fetching games:", error);
    throw error; // This will trigger the rejected case in the slice
  }
});


const CasualGameSlice = createSlice({
  name: 'CasualGame',
  initialState: {
    CasualGame: [],
    loading: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCasualGame.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCasualGame.fulfilled, (state, action) => {
        state.loading = false;
        state.CasualGame = action.payload; // Adjust based on the structure of the payload
      })
      .addCase(fetchCasualGame.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Capture any errors
      });
  },
});

export default CasualGameSlice.reducer;
