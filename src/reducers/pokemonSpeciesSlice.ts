import {
  IPokemonSpecies,
} from '../models/models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IPokemonSpeciesState {
  pokemonsSpecies: IPokemonSpecies[];
  isLoading: boolean;
  error: string;
}

const initialState: IPokemonSpeciesState = {
  pokemonsSpecies: [],
  isLoading: false,
  error: '',
};

export const pokemonSpeciesSlice = createSlice({
  name: 'pokemonSpecies',
  initialState,
  reducers: {
    fetchPokemonSpeciesSuccess(state, action: PayloadAction<IPokemonSpecies>) {
      state.pokemonsSpecies = [...state.pokemonsSpecies, action.payload];
      state.error = '';
      state.isLoading = false;
    },
    fetchPokemonSpeciesPending(state) {
      state.error = '';
      state.isLoading = true;
    },
    fetchPokemonSpeciesError(state) {
      state.isLoading = false;
    },
  },
});

export const {
  fetchPokemonSpeciesSuccess,
  fetchPokemonSpeciesPending,
  fetchPokemonSpeciesError,
} = pokemonSpeciesSlice.actions;

export default pokemonSpeciesSlice.reducer;
