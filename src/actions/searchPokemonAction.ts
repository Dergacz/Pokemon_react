import { Dispatch } from '@reduxjs/toolkit';
import * as API from '../api/api';
import { searchPokemonSlice } from '../reducers/searchPokemonSlice';

export const fetchSearchPokemon = (name: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(searchPokemonSlice.actions.fetchSearchPokemonPending());
    if (name) {
      const foundedPokemon = await API.fetchPokemonAPI(name);
      const foundedSpecies = await API.fetchPokemonSpeciesAPI(name);
      dispatch(searchPokemonSlice.actions.fetchSearchPokemonSuccess(foundedPokemon.data));
      dispatch(searchPokemonSlice.actions.fetchSearchPokemonSpeciesSuccess(foundedSpecies.data));
    }
  } catch (e) {
    dispatch(searchPokemonSlice.actions.searchPokemonError(e));
  }
};

export const clearSearchPokemonSpecies = () => async (dispatch: Dispatch) => {
  dispatch(searchPokemonSlice.actions.clearSearchPokemonSpeciesSuccess());
};
