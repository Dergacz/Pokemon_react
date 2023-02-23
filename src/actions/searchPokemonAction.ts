import { Dispatch } from '@reduxjs/toolkit';
import { pokemonSpeciesSlice } from '../reducers/pokemonSpeciesSlice';
import * as API from '../api/api';
import { searchPokemonSlice } from '../reducers/searchPokemonSlice';

export const fetchSearchPokemon = (name: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(searchPokemonSlice.actions.fetchSearchPokemonPending());
    if (name) {
      const foundedPokemon = await API.fetchPokemonAPI(name);
      const foundedSpecies = await API.fetchPokemonSpeciesAPI(name);
      dispatch(searchPokemonSlice.actions.fetchSearchPokemonSuccess(foundedPokemon.data));
      dispatch(pokemonSpeciesSlice.actions.fetchPokemonSpeciesSuccess(foundedSpecies.data));
    }
  } catch (e) {
    dispatch(searchPokemonSlice.actions.searchPokemonError(e));
  }
};
