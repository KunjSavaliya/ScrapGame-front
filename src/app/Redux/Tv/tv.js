    // src/Redux/TabletGameSlice.js
    import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

    export const fetchTvGame = createAsyncThunk('games/fetchscrapetabletgame', async () => {
      try {
        const response = await fetch('http://localhost:3012/api/users/scrape-tvgame');
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
      name: 'TvGame',
      initialState: {
        TvGame: [],
        loading: true,
        error: null,
      },
      reducers: {},
      extraReducers: (builder) => {
        builder
          .addCase(fetchTvGame.pending, (state) => {
            state.loading = true;
          })
          .addCase(fetchTvGame.fulfilled, (state, action) => {
            state.loading = false;
            state.TvGame = action.payload; // Adjust based on the structure of the payload
          })
          .addCase(fetchTvGame.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message; // Capture any errors
          })
          
      },
    });
    
    export default TabletGameSlice.reducer;
    