import { IFetchPokemons, IPokemon, IPokemonPreview, IPokemonSpecies } from "../models/models";
import { IPokemonState } from '../reducers/pokemonSlice';
import { IPokemonSpeciesState } from "../reducers/pokemonSpeciesSlice";
import { IPokemonEvolutionChain } from "../reducers/pokemonEvolutionSlice";
import { ISearchPokemonState } from "../reducers/searchPokemonSlice";

export const pokemonSliceInitialState: IPokemonState = {
  pokemons: null,
  pokemonsArray: [],
  pokemonTypes: [],
  pokemonCurrentType: null,
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

export const pokemonPayload: IPokemon = {
  name: 'name',
  id: 1,
  sprites: {
    front_default: 'test',
    front_shiny: 'test,',
    other: {
      dream_world: {
        front_default: 'test',
        front_shiny: 'test,',
      },
      home: {
        front_default: 'test',
        front_shiny: 'test,',
      },
      'official-artwork': {
        front_default: 'test',
        front_shiny: 'test,',
      },
    },
  },
  stats: [],
  abilities: [],
  types: [],
  weight: 100,
  height: 100,
};

export const currentPagePayload = 1;

export const pokemonSpeciesPayload: IPokemonSpecies = {
  name: 'name',
  color: {
    name: 'colorName',
    url: 'url',
  },
  flavor_text_entries: [],
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

export const pokemonSpeciesSliceInitialState: IPokemonSpeciesState = {
  pokemonsSpecies: [],
  isLoading: false,
  error: '',
};

export const pokemonEvolutionInitialState: IPokemonEvolutionChain = {
  pokemonEvolutionChain: [],
  pokemonEvolutionChainSpecies: [],
  isLoading: false,
  error: '',
};

export const searchPokemonInitialState: ISearchPokemonState = {
  searchedPokemon: null,
  searchedPokemonSpecies: null,
  isLoading: false,
  error: '',
};

export const pokemonName = 'pichu';

export const wrongPokemonName = 'wrongName';

export const pokemonTypeName = 'normal';

export const evolutionChainUrl = 'https://pokeapi.co/api/v2/evolution-chain/1/';

export const wrongEvolutionChainUrl = 'https://pokeapi.co/api/v2/evolution-chaifn/1/';

export const pokemonTypePreview: IPokemonPreview = {
  name: pokemonTypeName,
  url: 'test',
};

export const pokemonPreview: IPokemonPreview = {
  name: pokemonName,
  url: 'test',
};

export const wrongPokemonPreview: IPokemonPreview = {
  name: wrongPokemonName,
  url: 'test',
};

export const errorPayload = 'error';
