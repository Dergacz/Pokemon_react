import { Dispatch } from '@reduxjs/toolkit';
import { pokemonSlice } from '../reducers/pokemonSlice';
import axios from 'axios';
import { IFetchPokemons, IPokemon, IPokemonSpecies } from '../models/models';
import { pokemonSpeciesSlice } from '../reducers/pokemonSpeciesSlice';

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

export const fetchSearchPokemon = (name: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(pokemonSlice.actions.pokemonsPending());
    if (name) {
      const foundedPokemon = await instance.get<IPokemon>(`/pokemon/${name}`);
      const foundedSpecies = await instance.get<IPokemonSpecies>(`/pokemon-species/${name}/`);
      dispatch(pokemonSlice.actions.fetchSearchPokemonSuccess(foundedPokemon.data));
      dispatch(pokemonSpeciesSlice.actions.fetchPokemonSpeciesSuccess(foundedSpecies.data));
    }
  } catch (e) {
    dispatch(pokemonSlice.actions.searchPokemonError(e));
  }
};

export const fetchPokemonTypes = () => async (dispatch: Dispatch) => {
  try {
    dispatch(pokemonSlice.actions.pokemonsPending());
    const response = await instance.get<IFetchPokemons>('/type');
    dispatch(pokemonSlice.actions.fetchPokemonTypesSuccess(response.data.results));
  } catch (e) {

  }
};

export const fetchPokemonType = (name: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(pokemonSlice.actions.pokemonsPending());
    const response = await instance.get<IFetchPokemons>(`/type/${name}`);
    console.log(response.data);
    dispatch(pokemonSlice.actions.fetchPokemonTypeSuccess(response.data));
  } catch (e) {

  }
};

export const setCurrentPage = (currentPage: number) => (dispatch: Dispatch) => {
  dispatch(pokemonSlice.actions.setCurrentPageSuccess(currentPage));
};

export const clearError = () => (dispatch: Dispatch) => {
  dispatch(pokemonSlice.actions.clearErrorSuccess());
};
