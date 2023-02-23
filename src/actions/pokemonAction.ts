import { Dispatch } from '@reduxjs/toolkit';
import { pokemonSlice } from '../reducers/pokemonSlice';
import * as API from '../api/api';

export const fetchPokemons = (page: number = 0) => async (dispatch: Dispatch) => {
  try {
    dispatch(pokemonSlice.actions.pokemonsPending());
    const response = await API.fetchPokemonsAPI(page);
    dispatch(pokemonSlice.actions.fetchPokemonsSuccess(response.data));
  } catch (e) {
    dispatch(pokemonSlice.actions.pokemonError(e));
  }
};

export const fetchPokemon = (name: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(pokemonSlice.actions.pokemonsPending());
    const response = await API.fetchPokemonAPI(name);
    dispatch(pokemonSlice.actions.fetchPokemonSuccess(response.data));
  } catch (e) {
    dispatch(pokemonSlice.actions.pokemonError(e));
  }
};

export const fetchPokemonTypes = () => async (dispatch: Dispatch) => {
  try {
    dispatch(pokemonSlice.actions.pokemonsPending());
    const response = await API.fetchPokemonTypeAPI();
    dispatch(pokemonSlice.actions.fetchPokemonTypesSuccess(response.data.results));
  } catch (e) {
    dispatch(pokemonSlice.actions.pokemonError(e));
  }
};

export const fetchPokemonByType = (name: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(pokemonSlice.actions.pokemonsPending());
    const response = await API.fetchPokemonByTypeAPI(name);
    dispatch(pokemonSlice.actions.fetchPokemonByTypeSuccess(response.data));
  } catch (e) {
    dispatch(pokemonSlice.actions.pokemonError(e));
  }
};

export const clearPokemonType = () => (dispatch: Dispatch) => {
  try {
    dispatch(pokemonSlice.actions.clearPokemonTypeSuccess());
  } catch (e) {
    dispatch(pokemonSlice.actions.pokemonError(e));
  }
};

export const setCurrentPage = (currentPage: number) => (dispatch: Dispatch) => {
  dispatch(pokemonSlice.actions.setCurrentPageSuccess(currentPage));
};

export const clearError = () => (dispatch: Dispatch) => {
  dispatch(pokemonSlice.actions.clearErrorSuccess());
};
