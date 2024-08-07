// redux/gamesSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Game } from '../types/homePage/games';

interface GamesState {
  games: Game[];
  featuredGames: Game[];
  loading: boolean;
  error: string | null;
}

const initialState: GamesState = {
  games: [],
  featuredGames: [],
  loading: false,
  error: null,
};

// Async thunk to fetch games
export const fetchGames = createAsyncThunk(
  'games/fetchGames',
  async () => {
    const response = await axios.get('/api/games');
    return response.data.results;
  }
);

const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    setGames: (state, action) => {
      state.games = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGames.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGames.fulfilled, (state, action) => {
        state.loading = false;
        state.games = action.payload;
        // Cache the result
        localStorage.setItem('games', JSON.stringify(action.payload));
      })
      .addCase(fetchGames.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch games';
      });
  },
});

export const { setGames } = gamesSlice.actions;
export default gamesSlice.reducer;
