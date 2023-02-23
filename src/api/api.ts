import axios from 'axios';
import {
  IFetchEvolutionChain,
  IFetchPokemons, IFetchPokemonTypes,
  IPokemon,
  IPokemonSpecies,
} from '../models/models';

export const instance = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
});

export const fetchPokemonsAPI = (page: number) => instance.get<IFetchPokemons>(`/pokemon/?offset=${page * 9}&limit=9`);
export const fetchPokemonAPI = (name: string) => instance.get<IPokemon>(`/pokemon/${name}`);
export const fetchPokemonSpeciesAPI = (name: string) => instance.get<IPokemonSpecies>(`/pokemon-species/${name}`);
export const fetchPokemonTypeAPI = () => instance.get<IFetchPokemons>('/type');
export const fetchPokemonByTypeAPI = (name: string) => instance.get<IFetchPokemonTypes>(`/type/${name}`);
export const fetchPokemonEvolutionChainAPI = (url: string) => instance.get<IFetchEvolutionChain>(url);
