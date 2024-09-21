// gameDetailsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchGameDetails = createAsyncThunk(
  'gameDetails/fetchGameDetails',
  async (link) => {
    const response = await fetch(`http://localhost:5000/api/users/scrape-description`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: link }),
    });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const result = await response.json();
    return result.screenshots; // Assuming result.data is an array
  }
);

export const fetchGameData = createAsyncThunk(
  'gameDetails/fetchGameData',
  async (link) => {
    const response = await fetch(`http://localhost:5000/api/users/scrape-Details`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: link }),
    });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const result = await response.json();
    return result.games; // Assuming result.data is an array
  }
);

export const fetchGamesizeData = createAsyncThunk(
  'gameDetails/fetchGamesizeData',
  async (link) => {
    const response = await fetch(`http://localhost:5000/api/users/scrape-game`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: link }),
    });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const result = await response.json();
    return result.game; // Assuming result.data is an array
  }
);
const gameDetailsSlice = createSlice({
  name: 'gameDetails',
  initialState: {
    game: [],
    gameData: [],
    gameSizeData: [],

    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGameDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGameDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.game = action.payload;
      })
      .addCase(fetchGameDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchGameData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGameData.fulfilled, (state, action) => {
        state.loading = false;
        state.gameData = action.payload;
      })
      .addCase(fetchGameData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchGamesizeData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGamesizeData.fulfilled, (state, action) => {
        state.loading = false;
        state.gameSizeData = action.payload;
      })
      .addCase(fetchGamesizeData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const selectGameDetails = (state) => state.gameDetails;


export default gameDetailsSlice.reducer;
