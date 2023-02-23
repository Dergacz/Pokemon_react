import {
  IPokemon,
} from '../models/models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ISearchPokemonState {
  searchedPokemon: IPokemon;
  isLoading: boolean;
  error: string;
}

const initialState: ISearchPokemonState = {
  searchedPokemon: null,
  isLoading: false,
  error: '',
};

export const searchPokemonSlice = createSlice({
  name: 'searchPokemon',
  initialState,
  reducers: {
    fetchSearchPokemonPending(state) {
      state.isLoading = true;
      state.error = '';
    },
    fetchSearchPokemonSuccess(state, action: PayloadAction<IPokemon>) {
      state.searchedPokemon = action.payload;
      state.error = '';
      state.isLoading = false;
    },
    searchPokemonError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const {
  fetchSearchPokemonSuccess,
} = searchPokemonSlice.actions;

export default searchPokemonSlice.reducer;
