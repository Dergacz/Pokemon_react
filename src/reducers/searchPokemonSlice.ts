import {
  IPokemon,
  IPokemonSpecies,
} from '../models/models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ISearchPokemonState {
  searchedPokemon: IPokemon;
  searchedPokemonSpecies: IPokemonSpecies;
  isLoading: boolean;
  error: string;
}

const initialState: ISearchPokemonState = {
  searchedPokemon: null,
  searchedPokemonSpecies: null,
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
    fetchSearchPokemonSpeciesSuccess(state, action: PayloadAction<IPokemonSpecies>) {
      state.searchedPokemonSpecies = action.payload;
      state.error = '';
      state.isLoading = false;
    },
    clearSearchPokemonSpeciesSuccess(state) {
      state.searchedPokemonSpecies = null;
      state.error = '';
      state.isLoading = false;
    },
    searchPokemonError(state, action: PayloadAction<string>) {
      state.searchedPokemon = null;
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const {
  fetchSearchPokemonSuccess,
  fetchSearchPokemonSpeciesSuccess,
  clearSearchPokemonSpeciesSuccess,
  searchPokemonError,
  fetchSearchPokemonPending,
} = searchPokemonSlice.actions;

export default searchPokemonSlice.reducer;
