import searchPokemonSlice, {
  fetchSearchPokemonPending,
  fetchSearchPokemonSpeciesSuccess,
  fetchSearchPokemonSuccess, searchPokemonError,
} from '../../reducers/searchPokemonSlice';
import { errorPayload, pokemonPayload, pokemonSpeciesPayload, searchPokemonInitialState } from '../mock';
import { AnyAction } from '@reduxjs/toolkit';


describe('searchPokemonSlice', () => {
  it('should return default state when passed an empty action', () => {
    const result = searchPokemonSlice(searchPokemonInitialState, {
      type: '',
    });
    expect(result.error).toEqual('');
    expect(result.searchedPokemonSpecies).toEqual(null);
    expect(result.searchedPokemon).toEqual(null);
  });

  it('should search pokemon success', () => {
    const action = {
      type: fetchSearchPokemonSuccess.type,
      payload: pokemonPayload,
    };
    const result = searchPokemonSlice(searchPokemonInitialState, action);
    expect(result.searchedPokemon).toBeDefined();
  });

  it('should search pokemon species success', () => {
    const action = {
      type: fetchSearchPokemonSpeciesSuccess.type,
      payload: pokemonSpeciesPayload,
    };
    const result = searchPokemonSlice(searchPokemonInitialState, action);
    expect(result.searchedPokemonSpecies).toBeDefined();
    expect(result.searchedPokemonSpecies.color.name).toBeDefined();
  });

  it('clear search pokemon species pending', () => {
    const action: AnyAction = {
      type: fetchSearchPokemonSpeciesSuccess.type,
      payload: null,
    };
    const result = searchPokemonSlice(searchPokemonInitialState, action);
    expect(result.searchedPokemonSpecies).toBeNull();
  });

  it('should search pokemon pending', () => {
    const action = {
      type: fetchSearchPokemonPending.type,
    };
    const result = searchPokemonSlice(searchPokemonInitialState, action);
    expect(result.isLoading).toBeTruthy();
    expect(result.error).toBeFalsy();
  });

  it('should search pokemon error', () => {
    const action = {
      type: searchPokemonError.type,
      payload: errorPayload,
    };
    const result = searchPokemonSlice(searchPokemonInitialState, action);
    expect(result.isLoading).toBeFalsy();
    expect(result.error).toBeTruthy();
  });
});
