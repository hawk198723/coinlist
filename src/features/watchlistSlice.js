// src/features/watchlist/watchlistSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {
    addCoin: (state, action) => {
      state.push(action.payload);
    },
    removeCoin: (state, action) => {
      return state.filter((coin) => coin.id !== action.payload.id);
    },
  },
});

export const { addCoin, removeCoin } = watchlistSlice.actions;
export default watchlistSlice.reducer;
