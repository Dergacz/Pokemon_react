import { IFetchPokemons, IPokemon } from '../models/models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IPokemonState {
  pokemons: IFetchPokemons | null;
  pokemonsArray: IPokemon[];
  isLoading: boolean;
  error: string;
}

const initialState: IPokemonState = {
  pokemons: null,
  pokemonsArray: [],
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
      state.pokemonsArray = [...state.pokemonsArray, action.payload];
      state.pokemonsArray.sort((a, b) => (a.id > b.id ? 1 : -1));
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
