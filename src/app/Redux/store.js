// store/store.js
import { configureStore } from '@reduxjs/toolkit';
import gamesReducer from './gamesSlice';
import gameDetailsReducer from './gameDetailsSlice';
const store = configureStore({
  reducer: {
    games: gamesReducer,
    gameDetails: gameDetailsReducer,
  },
});

export default store;
