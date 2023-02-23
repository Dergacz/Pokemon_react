import {
  IFetchPokemons,
  IFetchPokemonTypes,
  IPokemon,
  IPokemonPreview,
} from '../models/models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IPokemonState {
  pokemons: IFetchPokemons | null;
  pokemonsArray: IPokemon[];
  pokemonTypes: IPokemonPreview[];
  pokemonCurrentType: IFetchPokemonTypes;
  currentPage: number;
  isLoading: boolean;
  error: string;
}

const initialState: IPokemonState = {
  pokemons: null,
  pokemonsArray: [],
  pokemonTypes: [],
  pokemonCurrentType: null,
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
      state.pokemons = action.payload;
      state.error = '';
    },
    fetchPokemonSuccess(state, action: PayloadAction<IPokemon>) {
      if (
        state.pokemonsArray.length < 9 &&
        (state.pokemonsArray.length === 0 ||
          state.pokemonsArray.find((item) => item.name !== action.payload.name))
      ) {
        const pokemonsSort = [...state.pokemonsArray, action.payload].sort(
          (a, b) => (a.id > b.id ? 1 : -1),
        );
        state.pokemonsArray = pokemonsSort;
      }
      state.error = '';
      state.isLoading = false;
    },
    fetchPokemonTypesSuccess(state, action: PayloadAction<IPokemonPreview[]>) {
      state.pokemonTypes = action.payload;
      state.isLoading = false;
    },
    fetchPokemonByTypeSuccess(state, action: PayloadAction<IFetchPokemonTypes>) {
      state.pokemonsArray = [];
      state.currentPage = 0;
      state.pokemonCurrentType = action.payload;
      state.isLoading = false;
    },
    setCurrentPageSuccess(state, action: PayloadAction<number>) {
      state.pokemonsArray = [];
      state.currentPage = action.payload;
    },
    clearPokemonTypeSuccess(state) {
      state.currentPage = 0;
      state.pokemonCurrentType = null;
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
    clearErrorSuccess(state) {
      state.error = '';
      state.isLoading = false;
    },
  },
});

export const {
  fetchPokemonsSuccess,
  pokemonsPending,
  fetchPokemonSuccess,
  pokemonError,
} = pokemonSlice.actions;

export default pokemonSlice.reducer;
