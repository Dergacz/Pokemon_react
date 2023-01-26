import { IFetchPokemons, IPokemon, IPokemonSpecies } from '../models/models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IPokemonState {
  pokemons: IFetchPokemons | null;
  pokemonsArray: IPokemon[];
  pokemonsSpecies: IPokemonSpecies[];
  isLoading: boolean;
  error: string;
}

const initialState: IPokemonState = {
  pokemons: null,
  pokemonsArray: [],
  pokemonsSpecies: [],
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
      state.isLoading = false;
    },
    fetchPokemonSuccess(state, action: PayloadAction<IPokemon>) {
      const pokemonsSort = [...state.pokemonsArray, action.payload].sort((a, b) => (a.id > b.id ? 1 : -1));
      state.pokemonsArray = pokemonsSort;
      state.isLoading = false;
    },
    fetchPokemonSpeciesSuccess(state, action: PayloadAction<IPokemonSpecies>) {
      state.pokemonsSpecies = [...state.pokemonsSpecies, action.payload];
      state.error = '';
      state.isLoading = false;
    },
    pokemonsPending(state) {
      state.isLoading = true;
    },
    pokemonError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export default pokemonSlice.reducer;
