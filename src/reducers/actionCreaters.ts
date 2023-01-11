import { Dispatch } from '@reduxjs/toolkit';
import { pokemonSlice } from './pokemonSlice';
import axios from 'axios';
import { IFetchPokemons, IPokemon } from '../models/models';

export const fetchPokemons = (page: number = 0) => async (dispatch: Dispatch) => {
  try {
    dispatch(pokemonSlice.actions.pokemonsPending());
    const response = await axios.get<IFetchPokemons>(`https://pokeapi.co/api/v2/pokemon/?offset=${page * 9}&limit=9`);
    dispatch(pokemonSlice.actions.fetchPokemonsSuccess(response.data));
  } catch (e) {
    dispatch(pokemonSlice.actions.pokemonError(e));
  }
};

export const fetchPokemon = (name: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(pokemonSlice.actions.pokemonsPending());
    const response = await axios.get<IPokemon>(`https://pokeapi.co/api/v2/pokemon/${name}`);
    dispatch(pokemonSlice.actions.fetchPokemonSuccess(response.data));
  } catch (e) {
    dispatch(pokemonSlice.actions.pokemonError(e));
  }
};
