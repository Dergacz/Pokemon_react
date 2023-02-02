import { Dispatch } from '@reduxjs/toolkit';
import { pokemonSlice } from './pokemonSlice';
import axios from 'axios';
import { IFetchEvolutionChain, IFetchPokemons, IFetchPokemonSpecies, IPokemon, IPokemonSpecies } from '../models/models';

const instance = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
});

export const fetchPokemons = (page: number = 0) => async (dispatch: Dispatch) => {
  try {
    dispatch(pokemonSlice.actions.pokemonsPending());
    const response = await instance.get<IFetchPokemons>(`/pokemon/?offset=${page * 9}&limit=9`);
    dispatch(pokemonSlice.actions.fetchPokemonsSuccess(response.data));
  } catch (e) {
    dispatch(pokemonSlice.actions.pokemonError(e));
  }
};

export const fetchPokemon = (name: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(pokemonSlice.actions.pokemonsPending());
    const response = await instance.get<IPokemon>(`/pokemon/${name}`);
    dispatch(pokemonSlice.actions.fetchPokemonSuccess(response.data));
  } catch (e) {
    dispatch(pokemonSlice.actions.pokemonError(e));
  }
};

export const fetchPokemonSpecies = (name: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(pokemonSlice.actions.pokemonsPending());
    const response = await instance.get<IPokemonSpecies>(`/pokemon-species/${name}/`);
    dispatch(pokemonSlice.actions.fetchPokemonSpeciesSuccess(response.data));
  } catch (e) {
    dispatch(pokemonSlice.actions.pokemonSpeciesError(e));
  }
};

export const fetchSearchPokemon = (name: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(pokemonSlice.actions.pokemonsPending());
    if (name) {
      const foundedPokemon = await instance.get<IPokemon>(`/pokemon/${name}`);
      const foundedSpecies = await instance.get<IPokemonSpecies>(`/pokemon-species/${name}/`);
      dispatch(pokemonSlice.actions.fetchSearchPokemonSuccess(foundedPokemon.data));
      dispatch(pokemonSlice.actions.fetchPokemonSpeciesSuccess(foundedSpecies.data));
    }
  } catch (e) {
    dispatch(pokemonSlice.actions.pokemonError(e));
  }
};

export const fetchPokemonEvolutionChain = (name: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(pokemonSlice.actions.pokemonsPending());
    const evolutionPokemon = [];
    const response = await instance.get<IFetchPokemonSpecies>(`/pokemon-species/${name}`);
    if (response) {
      const test = await instance.get<IFetchEvolutionChain>(response.data.evolution_chain.url);
      const pokemon1 = await instance.get(`/pokemon/${test.data.chain.species.name}`);
      evolutionPokemon.push(pokemon1.data);
      if (test.data.chain?.evolves_to[0]?.species?.name) {
        const pokemon2 = await instance.get(`/pokemon/${test.data.chain.evolves_to[0].species.name}`);
        evolutionPokemon.push(pokemon2.data);
      }
      if (test.data.chain?.evolves_to[0]?.evolves_to[0]?.species?.name) {
        const pokemon3 = await instance.get(`/pokemon/${test.data.chain.evolves_to[0].evolves_to[0].species.name}`);
        evolutionPokemon.push(pokemon3.data);
      }
    }
    dispatch(pokemonSlice.actions.fetchPokemonEvolutionChainSuccess(evolutionPokemon));
  } catch (e) {
    dispatch(pokemonSlice.actions.pokemonSpeciesError(e.message));
  }
};

export const clearPokemonsArray = () => (dispatch: Dispatch) => {
  dispatch(pokemonSlice.actions.clearPokemonsArraySuccess());
};
