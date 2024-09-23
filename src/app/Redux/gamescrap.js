// features/gamescrap.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const scrapeGameData = createAsyncThunk(
    'scraping/scrapeGameData',
    async ({url}) => {
     

        
        const response = await fetch(`http://localhost:3012/api/users/scrape-combined`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            
            body: JSON.stringify({url}),
        });

        if (!response.ok) {
            throw new Error('Failed to scrape data');
        }

        const data = await response.json();
        return data.data;
    }
);

const gamescrap = createSlice({
    name: 'scraping',
    initialState: {
        data: {},
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(scrapeGameData.fulfilled, (state, action) => {
                state.data = action.payload;
                state.error = null;
            })
            .addCase(scrapeGameData.rejected, (state, action) => {
                state.error = action.error.message;
            });
    },
});

export default gamescrap.reducer;
