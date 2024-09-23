// store/store.js
import { configureStore } from '@reduxjs/toolkit';
import gamesReducer from './gamesSlice';
import gamescrap from './gamescrap';
import topFreeGameReducer from './PhoneGame/TopFreeGame';


const store = configureStore({
  reducer: {
    games: gamesReducer,
    scraping: gamescrap,
    TopFreegame: topFreeGameReducer,
  },
});

export default store;
