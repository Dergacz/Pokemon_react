import { Dispatch } from '@reduxjs/toolkit';
import * as API from '../api/api';
import { pokemonSpeciesSlice } from '../reducers/pokemonSpeciesSlice';

export const fetchPokemonSpecies = (name: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(pokemonSpeciesSlice.actions.fetchPokemonSpeciesPending());
    const response = await API.fetchPokemonSpeciesAPI(name);
    dispatch(pokemonSpeciesSlice.actions.fetchPokemonSpeciesSuccess(response.data));
  } catch (e) {
    dispatch(pokemonSpeciesSlice.actions.fetchPokemonSpeciesError(e));
  }
};

export const clearPokemonSpecies = () => (dispatch: Dispatch) => {
  dispatch(pokemonSpeciesSlice.actions.clearPokemonSpeciesSuccess());
};
