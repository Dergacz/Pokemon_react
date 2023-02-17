import { IFetchPokemons, IPokemonSpecies } from '../models/models';
import { IPokemonState } from '../reducers/pokemonSlice';

export const pokemonSliceInitialState: IPokemonState = {
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
export const fetchPokemonsPayload: IFetchPokemons = {
  next: 'next',
  previous: 'previous',
  count: 10,
  results: [{ name: 'name', url: 'url' }],
};

export const pokemonPayload = {
  name: 'name',
  id: 1,
  weight: 100,
  height: 100,
};

export const pokemonSpeciesPayload: IPokemonSpecies = {
  name: 'name',
  color: {
    name: 'colorName',
    url: 'url',
  },
  evolution_chain: {
    url: 'url',
  },
};

export const pokemonEvolutionChainPayload = [
  {
    name: 'name',
    id: 1,
    weight: 100,
    height: 100,
  },
];

export const errorPayload = 'error';
