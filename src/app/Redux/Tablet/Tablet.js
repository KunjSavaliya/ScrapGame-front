    // src/Redux/TabletGameSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTabletGame = createAsyncThunk('games/fetchscrapetabletgame', async () => {
  try {
    const response = await fetch('http://localhost:3012/api/users/scrape-tabletgame');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data; // Ensure this returns data structured correctly for your state
    
  } catch (error) {
    console.error("Error fetching games:", error);
    throw error; // This will trigger the rejected case in the slice
  }
});


const TabletGameSlice = createSlice({
  name: 'TabletGame',
  initialState: {
    TabletGame: [],
    loading: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTabletGame.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTabletGame.fulfilled, (state, action) => {
        state.loading = false;
        state.TabletGame = action.payload; // Adjust based on the structure of the payload
      })
      .addCase(fetchTabletGame.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Capture any errors
      });
  },
});

export default TabletGameSlice.reducer;
