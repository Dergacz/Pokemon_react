import {
  IPokemon, IPokemonSpecies
} from "../models/models";
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IPokemonEvolutionChain {
  pokemonEvolutionChain: IPokemon[];
  pokemonEvolutionChainSpecies: IPokemonSpecies[];
  isLoading: boolean;
  error: string;
}

const initialState: IPokemonEvolutionChain = {
  pokemonEvolutionChain: [],
  pokemonEvolutionChainSpecies: [],
  isLoading: false,
  error: '',
};

export const pokemonEvolutionSlice = createSlice({
  name: 'pokemonEvolution',
  initialState,
  reducers: {
    fetchPokemonEvolutionChainPending(state) {
      state.error = '';
      state.isLoading = true;
    },
    fetchPokemonEvolutionChainSuccess(state, action: PayloadAction<IPokemon[]>) {
      state.pokemonEvolutionChain = action.payload;
      state.error = '';
      state.isLoading = false;
    },
    fetchPokemonEvolutionChainSpeciesSuccess(state, action: PayloadAction<IPokemonSpecies[]>) {
      state.pokemonEvolutionChainSpecies = action.payload;
      state.error = '';
      state.isLoading = false;
    },
    fetchPokemonEvolutionChainError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const {
  fetchPokemonEvolutionChainSuccess,
} = pokemonEvolutionSlice.actions;

export default pokemonEvolutionSlice.reducer;
