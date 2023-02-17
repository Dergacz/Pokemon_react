import {
  IFetchPokemons,
  IPokemon,
  IPokemonPreview,
  IPokemonSpecies,
} from '../models/models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IPokemonState {
  pokemons: IFetchPokemons | null;
  pokemonsArray: IPokemon[];
  pokemonsSpecies: IPokemonSpecies[];
  pokemonEvolutionChain: IPokemon[];
  pokemonTypes: IPokemonPreview[];
  pokemonType: any;
  currentPage: number;
  isLoading: boolean;
  error: string;
}

const initialState: IPokemonState = {
  pokemons: null,
  pokemonsArray: [],
  pokemonsSpecies: [],
  pokemonEvolutionChain: [],
  pokemonTypes: [],
  pokemonType: null,
  currentPage: 0,
  isLoading: false,
  error: '',
};

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    fetchPokemonsSuccess(state, action: PayloadAction<IFetchPokemons>) {
      state.pokemonsArray = [];
      state.pokemonsSpecies = [];
      state.pokemonEvolutionChain = [];
      state.pokemons = action.payload;
      state.error = '';
      state.isLoading = false;
    },
    fetchPokemonSuccess(state, action: PayloadAction<IPokemon>) {
      if (
        state.pokemonsArray.length < 9 &&
        (state.pokemonsArray.length === 0 ||
          state.pokemonsArray.find((item) => item.name !== action.payload.name))
      ) {
        const pokemonsSort = [...state.pokemonsArray, action.payload].sort(
          (a, b) => (a.id > b.id ? 1 : -1)
        );
        state.pokemonsArray = pokemonsSort;
      }
      state.error = '';
      state.isLoading = false;
    },
    fetchPokemonSpeciesSuccess(state, action: PayloadAction<IPokemonSpecies>) {
      state.pokemonsSpecies = [...state.pokemonsSpecies, action.payload];
      state.error = '';
      state.isLoading = false;
    },
    fetchSearchPokemonSuccess(state, action: PayloadAction<IPokemon>) {
      state.pokemonsArray = [action.payload];
      state.error = '';
      state.isLoading = false;
    },
    fetchPokemonEvolutionChainSuccess(
      state,
      action: PayloadAction<IPokemon[]>,
    ) {
      state.pokemonEvolutionChain = action.payload;
      state.error = '';
      state.isLoading = false;
    },
    fetchPokemonTypesSuccess(state, action: PayloadAction<IPokemonPreview[]>) {
      state.pokemonTypes = action.payload;
      state.isLoading = false;
    },
    fetchPokemonTypeSuccess(state, action: PayloadAction<any>) {
      state.pokemons = action.payload.pokemon;
      state.isLoading = false;
    },
    setCurrentPageSuccess(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    pokemonsPending(state) {
      state.isLoading = true;
      state.error = '';
    },
    pokemonError(state, action: PayloadAction<string>) {
      state.pokemonsArray = [];
      state.error = action.payload;
      state.isLoading = false;
    },
    pokemonSpeciesError(state) {
      state.pokemonEvolutionChain = [];
      state.isLoading = false;
    },
    searchPokemonError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearErrorSuccess(state) {
      state.error = '';
      state.isLoading = false;
    },
  },
});

export const {
  fetchPokemonsSuccess,
  fetchSearchPokemonSuccess,
  fetchPokemonSpeciesSuccess,
  fetchPokemonEvolutionChainSuccess,
  pokemonsPending,
  fetchPokemonSuccess,
  pokemonError,
  pokemonSpeciesError,
} = pokemonSlice.actions;

export default pokemonSlice.reducer;
