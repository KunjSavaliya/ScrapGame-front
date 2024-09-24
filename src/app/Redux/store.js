// store/store.js
import { configureStore } from '@reduxjs/toolkit';
import gamesReducer from './gamesSlice';
import gamescrap from './gamescrap';
import topFreeGameReducer from './PhoneGame/TopFreeGame';
import CasualGame from './PhoneGame/CasualGame';
import TabletGame from './Tablet/Tablet';




const store = configureStore({
  reducer: {
    games: gamesReducer,
    scraping: gamescrap,
    TopFreegame: topFreeGameReducer,
    CasualGame :CasualGame,
    TabletGame:TabletGame
  },
});

export default store;
