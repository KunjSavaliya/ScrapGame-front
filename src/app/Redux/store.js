// store/store.js
import { configureStore } from '@reduxjs/toolkit';
import gamesReducer from './gamesSlice';
import gamescrap from './gamescrap';

const store = configureStore({
  reducer: {
    games: gamesReducer,
    scraping: gamescrap,
  },
});

export default store;
