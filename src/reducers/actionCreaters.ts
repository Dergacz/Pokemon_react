import { Dispatch } from '@reduxjs/toolkit';
import { pokemonSlice } from './pokemonSlice';
import axios from 'axios';
import { IEvolvesTo, IFetchEvolutionChain, IFetchPokemons, IPokemon, IPokemonSpecies } from '../models/models';

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

export const fetchPokemonEvolutionChain = (name: string, url: string = '') => async (dispatch: Dispatch) => {
  try {
    dispatch(pokemonSlice.actions.pokemonsPending());
    const evolutionPokemon = [];
    if (url) {
      const evolutionChain = await instance.get<IFetchEvolutionChain>(url);
      const handleNameSpecies = (evolves: IEvolvesTo) => {
        const { species, evolves_to: evolvesTo, evolution_details: evolutionDetails } = evolves;
        let namesPokemons = [
          {
            name: species.name,
            level: 0,
          },
        ];
        if (evolutionDetails.length) {
          namesPokemons[0].level = evolutionDetails[0].min_level;
        }
        evolvesTo.forEach((evolve: IEvolvesTo) => {
          namesPokemons = namesPokemons.concat(handleNameSpecies(evolve));
        });
        return namesPokemons;
      };
      const pokemons = handleNameSpecies(evolutionChain.data.chain);
      for (let i = 0; i < pokemons.length; i++) {
        const pokemon = await instance.get(`/pokemon/${pokemons[i].name}`);
        evolutionPokemon.push(pokemon.data);
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
