import { Dispatch } from '@reduxjs/toolkit';
import { pokemonSlice } from '../reducers/pokemonSlice';
import * as API from '../api/api';
import { IPokemon, IPokemonPreview } from '../models/models';

export const fetchPokemons = (page: number = 0, count: number = 9) => async (dispatch: Dispatch) => {
  try {
    dispatch(pokemonSlice.actions.pokemonsPending());
    const response = await API.fetchPokemonsAPI(page, count);
    dispatch(pokemonSlice.actions.fetchPokemonsSuccess(response.data));
  } catch (e) {
    dispatch(pokemonSlice.actions.pokemonError(e));
  }
};

export const fetchPokemon = (pokemons: IPokemonPreview[]) => async (dispatch: Dispatch) => {
  try {
    dispatch(pokemonSlice.actions.pokemonsPending());
    let response;
    const pokemonsSort: IPokemon[] = [];
    for (let i = 0; i < pokemons.length; i++) {
      response = await API.fetchPokemonAPI(pokemons[i].name);
      pokemonsSort.push(response.data);
    }
    pokemonsSort.sort((a, b) => (a.id > b.id ? 1 : -1));
    dispatch(pokemonSlice.actions.fetchPokemonSuccess(pokemonsSort));
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
